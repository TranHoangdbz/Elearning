require('dotenv').config();
require('./services/passport');

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');

const PORT = 32

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(passport.initialize());

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: 'procourse',
    })
  );

const route = require('./routes');
route(app);

app.listen(PORT, () => console.log('Server Started'))
