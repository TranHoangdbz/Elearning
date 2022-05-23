require('dotenv').config()

const express = require('express')
const app = express();
const mongoose = require('mongoose')

const PORT = 32

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const coursesRouter = require('./routes/courses')
app.use('/courses', coursesRouter)

const route = require('./routes');
route(app);


app.listen(PORT, () => console.log('Server Started'))
