const router = require('express').Router();
const userController = require('../controllers/userController');

// Define routes and their handlers
//router.post('/register', userController.registerUser);
//router.post('/login', userController.loginUser);
//router.post('/logout', userController.logoutUser);

// ALL of these routes are PREFIXED with '/api/users'
router.use('/register', userController);
router.use('/login', userController);
router.use('/logout', userController);

// Export the router
module.exports = router;
