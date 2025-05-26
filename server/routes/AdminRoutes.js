const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/db'); // Make sure this exports your mysql2 pool

// Admin login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [admins] = await db.promise().query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length === 0) {
      console.log('Admin not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = admins[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Save admin info to session
    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;

    // Update last login
    await db.promise().query('UPDATE admins SET last_login = NOW() WHERE id = ?', [admin.id]);

    console.log('Login successful for:', email);
    res.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if admin session exists
router.get('/check-session', (req, res) => {
  if (req.session.adminId) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    // Check tables exist
    const [tableCheck] = await db.promise().query(`
      SELECT COUNT(*) as tableExists 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() AND table_name IN ('orders', 'menu_items')
    `);

    if (tableCheck[0].tableExists < 2) {
      return res.json({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        totalProducts: 0,
      });
    }

    // Fetch order stats
    const [orderStats] = await db.promise().query(`
      SELECT 
        COUNT(*) AS totalOrders,
        COALESCE(SUM(total_amount), 0) AS totalRevenue,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pendingOrders
      FROM orders
    `);

    // Fetch total products
    const [productStats] = await db.promise().query(
      'SELECT COUNT(*) AS totalProducts FROM menu_items'
    );

    res.json({
      totalOrders: parseInt(orderStats[0].totalOrders) || 0,
      totalRevenue: parseFloat(orderStats[0].totalRevenue) || 0,
      pendingOrders: parseInt(orderStats[0].pendingOrders) || 0,
      totalProducts: parseInt(productStats[0].totalProducts) || 0,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      totalProducts: 0,
      error: 'Error fetching stats',
    });
  }
});

// Get all orders with items
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.promise().query(`
      SELECT 
        o.*,
        COALESCE(u.name, o.customer_name, 'Guest') AS customer_name,
        COALESCE(u.email, o.customer_email, 'N/A') AS customer_email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    // Fetch items for each order in parallel for efficiency
    await Promise.all(
      orders.map(async (order) => {
        const [items] = await db.promise().query(`
          SELECT 
            oi.*,
            mi.name,
            mi.price
          FROM order_items oi
          JOIN menu_items mi ON oi.menu_item_id = mi.id
          WHERE oi.order_id = ?
        `, [order.id]);
        order.items = items;
      })
    );

    res.json(orders);
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status
router.patch('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await db.promise().query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Error updating order' });
  }
});

module.exports = router;
