const express = require('express');
const { User } = require('../models'); // Adjust the path according to your project structure

const router = express.Router();

// Registration handler
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      password,  // Password will be hashed in the model
    });

    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (err) {
    console.error('Error registering user: ', err); // More specific error logging
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login handler
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Use the model's checkPassword method
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set session or JWT here (example session handling)
    req.session.userId = user.id;

    res.status(200).json({ id: user.id, username: user.username });
  } catch (err) {
    console.error('Error logging in user: ', err); // More specific error logging
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.render('dashboard'); // Render the dashboard view
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
});

// Route to get all users (for debugging or admin use)
router.get('/', async (req, res) => {
  console.log('GET /api/users route hit'); // Debugging log
  try {
    // Fetch all users from the database
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude the password field
    });
    
    // Send the users as a JSON response
    res.json(users);
  } catch (err) {
    console.error('Error fetching users: ', err); // More specific error logging
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
