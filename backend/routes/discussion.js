const express = require("express");
const router = express.Router();

const discussionController = require('../controllers/discussionController');
router.get('/courses/:id', discussionController.getCourseByID);

module.exports = router;