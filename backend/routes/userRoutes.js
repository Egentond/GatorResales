const express = require('express');
const router = express.Router();
const { registerUser, signInUser, logoutUser, getUserData} = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.post('/register', registerUser);
router.post('/signin', signInUser);
router.post('/logout', protect, logoutUser);
router.get('/user-data', protect, getUserData);

module.exports = router;