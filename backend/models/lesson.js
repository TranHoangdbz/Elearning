const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  video: String,
  cloudId: String, //public_id of file in cloudinary
  lessonVolume: Number,
  quizz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizz",
    },
  ],
});

module.exports = mongoose.model("lesson", lessonSchema);
