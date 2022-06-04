const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signin",
    session: false,
  }),
  userController.callback
);

module.exports = router;
