const express = require('express');
const router = express.Router();
//middleware
const authMiddleware = require('../middleware/auth')
//controller
const userController = require('../controllers/userController');

router.get('/verify', userController.verifyUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

router.put('reset-password',authMiddleware,userController.resetPassword)

module.exports = router;