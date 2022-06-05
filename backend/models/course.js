const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
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
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lesson",
    },
  ],
  discussion: [],
  rating: [],
  isActive: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model("Course", courseSchema);
