const express = require('express');
const router = express.Router();
const connection = require('../database');

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
        if (!name || !email || !password || !role) {
            return res.status(400).send("All fields are required");
        }
        const roles = await connection.execute(`SELECT * FROM roles WHERE roles = ?`, [role]);
        if (roles[0].length === 0) {
            return res.status(400).send("Role does not exist");
        }
        if (!email.includes('@gmail.com')) {
            return res.status(400).send("Invalid email");
        }
        if (password.length < 8) {
            return res.status(400).send("Password must be at least 8 characters");
        }
        
        const [result] = await connection.execute(`INSERT INTO user_info (name, email, role) VALUES (?, ?, ?)`, [name, email, role]);
        res.status(201).send('user created successfully');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
