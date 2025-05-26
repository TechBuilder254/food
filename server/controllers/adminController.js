const bcrypt = require('bcrypt');
const db = require('../models/db');

const adminController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Get admin from database
            const [admins] = await db.promise().query(
                'SELECT * FROM admins WHERE email = ?',
                [email]
            );

            if (admins.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const admin = admins[0];
            const validPassword = await bcrypt.compare(password, admin.password);

            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Set admin session
            req.session.adminId = admin.id;
            req.session.adminEmail = admin.email;

            // Update last login timestamp
            await db.promise().query(
                'UPDATE admins SET last_login = NOW() WHERE id = ?',
                [admin.id]
            );

            res.json({
                success: true,
                admin: {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name
                }
            });

        } catch (error) {
            console.error('Admin login error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.json({ success: true });
    },

    getStats: async (req, res) => {
        try {
            const [stats] = await db.promise().query(`
                SELECT 
                    COUNT(*) as totalOrders,
                    SUM(total_amount) as totalRevenue,
                    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pendingOrders
                FROM orders
            `);

            const [products] = await db.promise().query(
                'SELECT COUNT(*) as totalProducts FROM products'
            );

            res.json({
                totalOrders: stats[0].totalOrders || 0,
                totalRevenue: stats[0].totalRevenue || 0,
                pendingOrders: stats[0].pendingOrders || 0,
                totalProducts: products[0].totalProducts || 0
            });

        } catch (error) {
            console.error('Stats error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    getProfile: async (req, res) => {
        try {
            const [admin] = await db.promise().query(
                'SELECT id, email, name, created_at, last_login FROM admins WHERE id = ?',
                [req.session.adminId]
            );

            if (admin.length === 0) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            res.json(admin[0]);

        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = adminController;