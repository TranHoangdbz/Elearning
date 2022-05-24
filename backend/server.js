require('dotenv').config()

const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

app.use(cors());

const PORT = 32

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const GoogleClientID = '127746184739-7rv5euqh360qrcdvbd5oh1vr4hg6lbag.apps.googleusercontent.com';
const GoogleClientSecret = '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';
passport.use(
    new GoogleStrategy(
        {
            clientID: GoogleClientID,
            clientSecret: GoogleClientSecret,
            callbackURL: '/auth/google/callback'
        }, (profile, done) => {
            if (profile.id) {
                User.findOne({ _id: profile.id })
                    .then((existingUser) => {
                        if (existingUser) {
                            done(null, existingUser);
                        } else {
                            new User({
                                email: profile.emails[0].value,
                                fullName: profile.name.familyName + ' ' + profile.name.givenName
                            })
                                .save()
                                .then(user => done(null, user));
                        }
                    })
            }
        }
    )
);

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const coursesRouter = require('./routes/courses')
app.use('/courses', coursesRouter)

const route = require('./routes');
const { propfind } = require('./routes/courses');
route(app);

app.listen(PORT, () => console.log('Server Started'))
