const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all orders with their items
router.get('/orders', async (req, res) => {
    try {
        // Fetch orders - no join on users table because user_id doesn't exist
        const [orders] = await db.promise().query(`
            SELECT 
                o.id,
                o.customer_name,
                o.customer_email,
                o.customer_phone,
                o.address,
                o.total_amount,
                o.payment_method,
                o.status,
                o.created_at
            FROM orders o
            ORDER BY o.created_at DESC
        `);

        // Fetch order items for each order
        for (let order of orders) {
            const [items] = await db.promise().query(`
                SELECT 
                    oi.id,
                    oi.order_id,
                    oi.menu_item_id,
                    oi.quantity,
                    oi.price,
                    mi.name AS menu_item_name,
                    mi.price AS menu_item_price
                FROM order_items oi
                JOIN menu_items mi ON oi.menu_item_id = mi.id
                WHERE oi.order_id = ?
            `, [order.id]);

            order.items = items;
        }

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

        await db.promise().query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ message: 'Error updating order' });
    }
});

module.exports = router;
