const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

router.get("/", lessonController.getAll);
router.get("/:id", lessonController.getById);
router.get("/courses/:id", lessonController.getByCourseId);
router.post("/", lessonController.create);
router.put("/:id", lessonController.updateById);
router.patch("/:id", lessonController.updateFieldLesson);
router.delete("/:id", lessonController.deleteById);

module.exports = router;
