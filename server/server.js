const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const adminRoutes = require('./routes/AdminRoutes');
const authRoutes = require('./routes/auth');



const app = express();
app.use('/api/auth', authRoutes);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'admin-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Database connected successfully');
  connection.release();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
// Register new user
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
  }

  try {
    // Check if user exists
    const [existingUser] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    // Insert new user (you might want to hash passwords in production)
    await db.promise().query(
      'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, password]
    );

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, error: 'Server error during registration' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const user = users[0];

    // In production, use hashed passwords with bcrypt.compare()
    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Save user info in session
    req.session.userId = user.id;
    req.session.userName = user.name;

    res.json({ success: true, message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
});

// Admin routes
app.use('/api/admin', adminRoutes);

// Validate order data middleware
const validateOrderData = (req, res, next) => {
  const { items, totalAmount, customer, paymentMethod } = req.body;

  const errors = [];

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (!customer?.fullName?.trim()) errors.push('Customer name is required');
  if (!customer?.phone?.trim()) errors.push('Phone number is required');
  if (!customer?.email?.trim()) errors.push('Email is required');
  if (!customer?.address?.trim()) errors.push('Delivery address is required');

  if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
    errors.push('Valid total amount is required');
  }

  if (!['mpesa', 'card', 'cash'].includes(paymentMethod)) {
    errors.push('Valid payment method is required (mpesa, card, or cash)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

// Get menu items
app.get('/api/menu-items', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM menu_items');
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu items'
    });
  }
});

// Create order
app.post('/api/orders', validateOrderData, async (req, res) => {
  const { items, totalAmount, customer, paymentMethod } = req.body;
  const connection = await db.promise().getConnection();
  
  try {
    console.log('Processing order:', {
      customerName: customer.fullName,
      items: items.length,
      total: totalAmount
    });

    await connection.beginTransaction();

    // Verify menu items exist and prices match
    for (const item of items) {
      const [menuItem] = await connection.query(
        'SELECT id, price FROM menu_items WHERE id = ?',
        [item.id]
      );

      if (menuItem.length === 0) {
        throw new Error(`Menu item with ID ${item.id} not found`);
      }

      // Verify price matches to prevent tampering
      if (Math.abs(menuItem[0].price - item.price) > 0.01) {
        throw new Error(`Price mismatch for item ${item.id}`);
      }
    }

    // Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (
        customer_name, 
        customer_email, 
        customer_phone, 
        address, 
        total_amount, 
        payment_method, 
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        customer.fullName.trim(),
        customer.email.trim().toLowerCase(),
        customer.phone.trim(),
        customer.address.trim(),
        totalAmount,
        paymentMethod,
        'pending'
      ]
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (
          order_id, 
          menu_item_id, 
          quantity, 
          price,
          created_at
        ) VALUES (?, ?, ?, ?, NOW())`,
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await connection.commit();
    console.log('Order created successfully:', { orderId });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId,
        status: 'pending',
        createdAt: new Date()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    });
  } finally {
    connection.release();
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});