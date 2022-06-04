const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const upload = require('../middleware/multer');
router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.post("/", courseController.create);
router.put("/:id", courseController.updateById);
router.patch(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  courseController.updateFieldCourse
);
router.delete("/:id", courseController.deleteById);

module.exports = router;
