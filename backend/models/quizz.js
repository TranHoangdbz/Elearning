const mongoose = require("mongoose");

const QuizzSchema = new mongoose.Schema({
  quizzCode: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choice: [{
    type: String,
    required: true,
  }],
  answer: [{
    type: String,
    required: true,
  }]  ,
});

module.exports = mongoose.model("Quizz", QuizzSchema);
