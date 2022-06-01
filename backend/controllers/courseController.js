const mongoose = require("mongoose");
const Course = require("../models/course");

const getAll = async (req, res) => {
  try {
    const results = await Course.find({}).lean().populate("lessons").populate("teacher");

    return res.status(200).json({
      success: true,
      message: "Get all courses successfully!",
      data: results,
    });
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
    const result = await Course.findOne({
      _id: id,
    }).populate("lessons").populate("teacher")

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Get the course's details successfully!",
        data: result,
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

const create = async (req, res) => {
  try {
    const { courseName, courseImage, description, lessons } = req.body;
    let errors = {};

    if (courseName === "") {
      errors["courseName"] = ["Course name is required!"];
    }

    if (courseImage === "") {
      errors["courseImage"] = ["Course image is required!"];
    }

    if (description === "") {
      errors["description"] = ["Description is required!"];
    }

    if (Object.keys(errors)?.length > 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to create a new course!",
        errors,
      });
    }

    const newItem = new Course({
      courseName,
      courseImage,
      description,
      lessons,
    });

    const result = await newItem.save();

    if (result) {
      return res.status(201).json({
        success: true,
        message: "Create a new course successfully!",
        data: result,
      });
    } else {
      throw new Error("Failed to create a new course!");
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
    const result = await Course.findOne({
      _id: id,
    });

    if (result) {
      const { courseName, courseImage, description, lessons } = req.body;

      let errors = {};

      if (courseName === "") {
        errors["courseName"] = ["Course name is required!"];
      }

      if (courseImage === "") {
        errors["courseImage"] = ["Course image is required!"];
      }

      if (description === "") {
        errors["description"] = ["Description is required!"];
      }

      if (Object.keys(errors)?.length > 0) {
        return res.status(500).json({
          success: false,
          message: "Failed to update the course!",
          errors,
        });
      }

      const result = await Course.updateOne(
        {
          _id: id,
        },
        {
          courseName,
          courseImage,
          description,
          lessons,
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
      throw new Error("This course does not exist!");
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
    const result = await Course.findOne({
      _id: id,
    });

    if (result) {
      const deleteResult = await Course.deleteOne({
        _id: id,
      });

      if (deleteResult) {
        return res.status(200).json({
          success: true,
          message: "Delete the course successfully!",
        });
      } else {
        throw new Error("Failed to delete the course!");
      }
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

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
