const usersRouter = require('./users');
const googleRouter = require('./google');
const facebookRouter = require('./facebook');

function router(app) {
    app.use('/api/users', usersRouter);
    app.use('/auth/google', googleRouter);
    app.use('/auth/facebook', facebookRouter);

}

module.exports = router;