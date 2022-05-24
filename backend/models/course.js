const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // teacher: {
  //   type: mongoose.Types.ObjectId(),
  //   ref: "Teacher",
  // },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lesson",
    },
  ],
  discussion: [],
  rating: [],
});

module.exports = mongoose.model("Course", courseSchema);
