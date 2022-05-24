const mongoose = require("mongoose");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");

const getAll = async (req, res) => {
  try {
    const results = await Course.find({}).lean();

    return res.status(200).json({
      success: true,
      message: "Get all courses successfully!",
      data: results,
    });
  } catch (error) {
    console.log("controller.course.getAll", error);

    return res.status(200).json({
      success: false,
      message: "Failed to get all courses!",
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Course.findOne({
      _id: id,
    });
    const lessons = await Lesson.find({
      course: id,
    });
    result["lessons"] = lessons;

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Get the course's details successfully!",
        data: result,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "This course does not exist!",
      });
    }
  } catch (error) {
    console.log("controller.course.getById", error);

    return res.status(200).json({
      success: false,
      message: "Failed to get the course's details!",
    });
  }
};

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    let errors = {};

    if (title === "") {
      errors["title"] = ["Title is required!"];
    }

    if (Object.keys(errors)?.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Failed to create a new course!",
        errors,
      });
    }

    const newItem = new Course({
      title,
      description,
    });

    const result = await newItem.save();

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Create a new course successfully!",
      });
    } else {
      throw new Error("Failed to create a new course!");
    }
  } catch (error) {
    console.log("controller.course.create", error);

    return res.status(200).json({
      success: false,
      message: "Failed to create a new course!",
    });
  }
};

const updateById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Course.findOne({
      _id: id,
    });

    if (result) {
      const { title, description } = req.body;

      let errors = {};

      if (title === "") {
        errors["title"] = ["Title is required!"];
      }

      if (Object.keys(errors)?.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Failed to update the new course!",
          errors,
        });
      }

      const result = await Course.updateOne(
        {
          _id: id,
        },
        {
          title,
          description,
        }
      );

      if (result.modifiedCount === 1) {
        return res.status(200).json({
          success: true,
          message: "Update the course successfully!",
        });
      } else {
        throw new Error("Failed to update the course!");
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "This course does not exist!",
      });
    }
  } catch (error) {
    console.log("controller.course.updateById", error);

    return res.status(200).json({
      success: false,
      message: "Failed to update the course!",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req?.params?.id);
    const result = await Course.deleteOne({
      _id: id,
    });

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Delete the course successfully!",
      });
    } else {
      throw new Error("Failed to delete the course!");
    }
  } catch (error) {
    console.log("controller.course.deleteById", error);

    return res.status(200).json({
      success: false,
      message: "Failed to delete the course!",
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
