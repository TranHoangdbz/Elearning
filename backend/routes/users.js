const express = require("express");
const router = express.Router();
//middleware
const authMiddleware = require('../middleware/auth')
//controller
const userController = require('../controllers/userController');

router.get("/verify", userController.verifyUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current-user", authMiddleware, userController.getCurrentUser);

router.get(
  "/test",
  authMiddleware,
  userController.test
);

router.put('/reset-password',authMiddleware,userController.resetPassword)
router.put('/get-new-password', userController.getNewPassword);

module.exports = router;
