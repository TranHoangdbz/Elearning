const usersRouter = require("./users");
const lessonsRouter = require("./lessons");
const coursesRouter = require("./courses");
const filesRouter = require("./files");

function router(app) {
  app.use("/api/users", usersRouter);
  app.use("/lessons", lessonsRouter);
  app.use("/courses", coursesRouter);
  app.use("/files", filesRouter);
}

module.exports = router;
