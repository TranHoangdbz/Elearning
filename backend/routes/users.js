const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/verify", userController.verifyUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
  "/test",
  auth,
  userController.test
);

module.exports = router;
