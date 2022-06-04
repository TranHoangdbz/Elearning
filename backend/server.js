require('dotenv').config();
require('./services/passport');

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const PORT = 32

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_TOKEN],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const route = require('./routes');
route(app);

app.listen(PORT, () => console.log('Server Started'))
