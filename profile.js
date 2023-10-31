const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config'); // Import your configuration
const auth = require('../middleware/auth'); // Import your authentication middleware
const User = require('../models/User'); // Import the User model

// Define the profile update route
router.put('/profile', auth, (req, res) => {
  // Extract the user's data from the request
  const { age, gender } = req.body;

  // Find the user by their ID (available from the auth middleware)
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's profile data
    user.age = age || user.age;
    user.gender = gender || user.gender;

    // Save the updated user data
    user.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating profile' });
      }

      return res.json({ message: 'Profile updated successfully' });
    });
  });
});

module.exports = router;
