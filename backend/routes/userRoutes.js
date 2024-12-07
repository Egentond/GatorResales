const express = require('express');
const router = express.Router();
const { registerUser, signInUser, logoutUser, getUserData} = require('../controllers/userController')
const { protect } = require('../middleware/auth')

// User routes
router.post('/register', registerUser);
router.post('/login', signInUser);
router.post('/logout', protect, logoutUser);
router.get('/user-data', protect, getUserData);

module.exports = router;