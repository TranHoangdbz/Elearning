const usersRouter = require('./users');
const googleRouter = require('./google');

function router(app) {
    app.use('/api/users', usersRouter);
    app.use('/auth/google', googleRouter);

}

module.exports = router;