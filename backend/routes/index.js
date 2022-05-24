const usersRouter = require('./users');
const lessonRouter = require('./lesson')
const coursesRouter = require('./courses')

function router(app) {
    app.use('/api/users', usersRouter);
    app.use('/lesson', lessonRouter);
    app.use('/courses', coursesRouter);
}

module.exports = router;
