// require('dotenv').config()

const express = require('express')
const app = express();
const mongoose = require('mongoose')

const PORT = 5000

mongoose.connect("mongodb+srv://admin:admin@uit-elearning.uqfe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const coursesRouter = require('./routes/courses')
app.use('/courses', coursesRouter)

app.listen(PORT, () => console.log('Server Started'))