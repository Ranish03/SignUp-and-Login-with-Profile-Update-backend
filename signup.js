const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('./config');

 // Import your configuration

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Create a new user
  const newUser = new User({
    name,
    email,
    password,
  });

  // Save the new user to the database
  newUser.save((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating the user' });
    }

    // User is created, generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, config.secretKey, {
      expiresIn: '1h', // Token expiration time
    });

    return res.status(201).json({ message: 'Registration successful', token });
  });
});

module.exports = router;
