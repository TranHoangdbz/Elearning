const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
  lessonVolume: {
    type: Number,
  },
  quizz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizz",
    },
  ],
  passed: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("lesson", lessonSchema);
