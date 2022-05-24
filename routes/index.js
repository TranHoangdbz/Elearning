const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lesson.controller");
const uploadController = require("../controllers/upload.controller");

// LESSONS
router.get("/lessons", lessonController.getAll);
router.get("/lessons/:id", lessonController.getById);
router.get("/lessons/courses/:id", lessonController.getByCourseId);
router.post("/lessons", lessonController.create);
router.put("/lessons/:id", lessonController.updateById);
router.delete("/lessons/:id", lessonController.deleteById);

// UPLOAD & DOWNLOAD
router.post("/upload", uploadController.upload);
router.post("/download/:name", uploadController.upload);

module.exports = router;
