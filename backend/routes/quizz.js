const express = require("express");
const router = express.Router();
const quizzController = require("../controllers/quizzController");

router.get("/", quizzController.getAll);

module.exports = router;
