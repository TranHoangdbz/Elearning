const usersRouter = require('./users');

function router(app) {
    app.use('/api/users', usersRouter);
}

module.exports = router;