const mongoose = require("mongoose");
const Lesson = require("../models/lesson.model");
const Course = require("../models/course.model");

const getAll = async (req, res) => {
  try {
    const results = await Lesson.find({}).lean();

    return res.status(200).json({
      success: true,
      message: "Get all lessons successfully!",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getByCourseId = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Course.findOne({
      _id: id,
    });

    if (result) {
      const results = await Lesson.find({
        courseId: id,
      }).lean();

      return res.status(200).json({
        success: true,
        message: "Get all course's lessons successfully!",
        data: results,
      });
    } else {
      throw new Error("This course does not exist!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Lesson.findOne({
      _id: id,
    }).populate("quizz");

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Get the lesson's details successfully!",
        data: result,
      });
    } else {
      throw new Error("This lesson does not exist!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { name, description, video, lessonVolume, quizz } = req.body;
    let errors = {};

    if (name === "") {
      errors["name"] = ["Name is required!"];
    }

    if (Object.keys(errors)?.length > 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to create a new lesson!",
        errors,
      });
    }

    const newItem = new Lesson({
      name,
      description,
      video,
      lessonVolume,
      quizz,
    });

    const result = await newItem.save();

    if (result) {
      return res.status(201).json({
        success: true,
        message: "Create a new lesson successfully!",
      });
    } else {
      throw new Error("Failed to create a new lesson!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Lesson.findOne({
      _id: id,
    });

    if (result) {
      const { name, description, video, lessonVolume, quizz } = req.body;

      let errors = {};

      if (name === "") {
        errors["name"] = ["Name is required!"];
      }

      if (Object.keys(errors)?.length > 0) {
        return res.status(500).json({
          success: false,
          message: "Failed to update the lesson!",
          errors,
        });
      }

      const result = await Lesson.updateOne(
        {
          _id: id,
        },
        {
          name,
          description,
          video,
          lessonVolume,
          quizz,
        }
      );

      if (result.modifiedCount === 1) {
        return res.status(200).json({
          success: true,
          message: "Update the lesson successfully!",
        });
      } else {
        throw new Error("Failed to update the lesson!");
      }
    } else {
      throw new Error("This lesson does not exist!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Lesson.findOne({
      _id: id,
    });

    if (result) {
      const deleteResult = await Lesson.deleteOne({
        _id: id,
      });

      if (deleteResult) {
        return res.status(200).json({
          success: true,
          message: "Delete the lesson successfully!",
        });
      } else {
        throw new Error("Failed to delete the lesson!");
      }
    } else {
      throw new Error("This lesson does not exist!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  getByCourseId,
  getById,
  create,
  updateById,
  deleteById,
};
