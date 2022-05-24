const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { PORT, MONGODB_URI } = require("./constants");

const lessonController = require("./controllers/lesson.controller");
const uploadController = require("./controllers/upload.controller");
const courseController = require("./controllers/course.controller");

global.__basedir = __dirname;

app.use(cors());
app.use(morgan("dev"));

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connect to the database successfully!"))
  .catch(() => console.log("Error while connecting to MongoDB!"));

// COURSES
app.get("/courses", courseController.getAll);
app.get("/courses/:id", courseController.getById);
app.post("/courses", courseController.create);
app.put("/courses/:id", courseController.updateById);
app.delete("/courses/:id", courseController.deleteById);

// LESSONS
app.get("/lessons", lessonController.getAll);
app.get("/lessons/:id", lessonController.getById);
app.get("/lessons/courses/:id", lessonController.getByCourseId);
app.post("/lessons", lessonController.create);
app.put("/lessons/:id", lessonController.updateById);
app.delete("/lessons/:id", lessonController.deleteById);

// UPLOAD & DOWNLOAD
app.post("/upload", uploadController.upload);
app.get("/download/:name", uploadController.download);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}...`);
});
