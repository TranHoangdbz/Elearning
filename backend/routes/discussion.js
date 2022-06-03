const express = require("express");
const router = express.Router();

const discussionController = require('../controllers/discussionController');
router.get('/lesson-quizz/:id', discussionController.getLessonandQuizzByCourseID);
router.get('/user/:id', discussionController.getUserInformation);

module.exports = router;    