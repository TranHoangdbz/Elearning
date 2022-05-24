const mongoose = require("mongoose");
const Lesson = require("../models/lesson.model");

const getAll = async (req, res) => {
  try {
    const results = await Lesson.find({}).lean();

    return res.status(200).json({
      success: true,
      message: "Get all lessons successfully!",
      data: results,
    });
  } catch (error) {
    console.log("controller.lesson.getAll", error);

    return res.status(200).json({
      success: false,
      message: "Failed to get all lessons!",
    });
  }
};

const getByCourseId = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const results = await Lesson.find({
      courseId: id,
    }).lean();

    return res.status(200).json({
      success: true,
      message: "Get all course's lessons successfully!",
      data: results,
    });
  } catch (error) {
    console.log("controller.lesson.getByCourseId", error);

    return res.status(200).json({
      success: false,
      message: "Failed to get all course's lessons!",
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Lesson.findOne({
      _id: id,
    });

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Get the lesson's details successfully!",
        data: result,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "This lesson does not exist!",
      });
    }
  } catch (error) {
    console.log("controller.lesson.getById", error);

    return res.status(200).json({
      success: false,
      message: "Failed to get the lesson's details!",
    });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, video, lesson_volume, courseId } = req.body;
    let errors = {};

    if (title === "") {
      errors["title"] = ["Title is required!"];
    }

    if (Object.keys(errors)?.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Failed to create a new lesson!",
        errors,
      });
    }

    const newItem = new Lesson({
      title,
      description,
      video,
      lesson_volume,
      course: mongoose.Types.ObjectId(courseId),
    });

    const result = await newItem.save();

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Create a new lesson successfully!",
      });
    } else {
      throw new Error("Failed to create a new lesson!");
    }
  } catch (error) {
    console.log("controller.lesson.create", error);

    return res.status(200).json({
      success: false,
      message: "Failed to create a new lesson!",
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
      const { title, description, video, lesson_volume, courseId } = req.body;

      let errors = {};

      if (title === "") {
        errors["title"] = ["Title is required!"];
      }

      if (Object.keys(errors)?.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Failed to update the new lesson!",
          errors,
        });
      }

      const result = await Lesson.updateOne(
        {
          _id: id,
        },
        {
          title,
          description,
          video,
          lesson_volume,
          course: mongoose.Types.ObjectId(courseId),
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
      return res.status(200).json({
        success: false,
        message: "This lesson does not exist!",
      });
    }
  } catch (error) {
    console.log("controller.lesson.updateById", error);

    return res.status(200).json({
      success: false,
      message: "Failed to update the lesson!",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Lesson.deleteOne({
      _id: id,
    });

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Delete the lesson successfully!",
      });
    } else {
      throw new Error("Failed to delete the lesson!");
    }
  } catch (error) {
    console.log("controller.lesson.deleteById", error);

    return res.status(200).json({
      success: false,
      message: "Failed to delete the lesson!",
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
