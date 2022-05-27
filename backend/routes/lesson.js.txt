const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const Course = require("../models/course");
const lesson = require("../models/lesson");
const Quizz = require("../models/quizz");
const router = Router();

router.patch("/update/:lessonId", async (req, res) => {
  const lessonId = req.params.lessonId;
  const { name, description, video, lessonVolume } = req.body;

  lesson
    .findById(lessonId, function (err, doc) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      doc.name = name;
      doc.description = description;
      doc.video = video;
      doc.lessonVolume = lessonVolume;

      doc
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:lessonID", async (req, res) => {
  const lessonID = req.params.lessonID;
  try {
    const existLesson = await lesson.findById(lessonID);

    //Delete quizz of lesson
    const quizzIDs = existLesson.quizz;
    const asyncDeleteQuizz = Quizz.deleteMany({ _id: { $in: quizzIDs } });

    //Delete Lesson in course
    const asyncUpdateLesson = Course.updateOne(
      { lessons: existLesson._id },
      { $pull: { lessons: existLesson._id } }
    );

    await Promise.all([asyncDeleteQuizz, asyncUpdateLesson]);

    //Delete lesson
    await lesson.deleteOne({ _id: existLesson._id });

    res.status(200).json({
      success: true,
      error: false,
      message: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "",
    });
  }
});

module.exports = router;
