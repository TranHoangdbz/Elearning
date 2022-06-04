const mongoose = require("mongoose");
const Quizz = require("../models/quizz");

const getAll = async (req, res) => {
  try {
    const results = await Quizz.find({});

    return res.status(200).json({
      success: true,
      message: "Get all quizzes successfully!",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
};
