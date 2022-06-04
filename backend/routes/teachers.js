const express = require("express");
const router = express.Router();
const teacherController = require('../controllers/lessonController')

router.get("/", teacherController.getAll);

module.exports = router;
