const usersRouter = require("./users");
const lessonsRouter = require("./lessons");
const coursesRouter = require("./courses");
const filesRouter = require("./files");
const discussionRouter = require("./discussion");
const teacherRouter = require('./teachers')

function router(app) {
  app.use("/api/users", usersRouter);
  app.use("/api/lessons", lessonsRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/files", filesRouter);
  app.use("/api/discussions", discussionRouter);
  app.use("/api/teachers", teacherRouter)
}

module.exports = router;
