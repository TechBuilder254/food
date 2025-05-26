const bcrypt = require('bcrypt');
const readline = require('readline');
const db = require('../models/db');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function initializeAdmin() {
    try {
        console.log('=== Admin Account Setup ===\n');

        const email = await new Promise(resolve => {
            rl.question('Enter admin email: ', resolve);
        });

        const password = await new Promise(resolve => {
            rl.question('Enter admin password: ', resolve);
        });

        const name = await new Promise(resolve => {
            rl.question('Enter admin name: ', resolve);
        });

        // Validate inputs
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert or update admin
        await db.promise().query(
            `INSERT INTO admins (email, password, name) 
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE 
             password = VALUES(password),
             name = VALUES(name)`,
            [email, hashedPassword, name]
        );

        console.log('\nAdmin account created successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error creating admin:', error.message);
        process.exit(1);
    }
}

initializeAdmin();