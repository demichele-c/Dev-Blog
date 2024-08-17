const { User } = require('../models');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


// ALL of these routes are PREFIXE 'api/users/logout'
// User registration
router.post('/register', async (req, res) => {  // POST HTTP method --> '/api/users/register/register'
  try {
    const { username, password } = req.body;
    
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash the password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    
    // Save the user ID in the session
    req.session.user_id = newUser.id;
    req.session.save(() => {
      // Send the new user data without password
      const userWithoutPassword = newUser.toJSON();
      delete userWithoutPassword.password;
      res.status(200).json(userWithoutPassword);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      req.session.user_id = user.id;
      req.session.save(() => {
        // Send the user data without password
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        res.status(200).json(userWithoutPassword);
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
