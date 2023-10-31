const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // If everything is correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time (adjust as needed)
    });

    // Return the token to the client
    res.json({ token, message: 'Login successful' });
  });
});

module.exports = router;