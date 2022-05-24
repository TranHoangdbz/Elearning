// require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const routers = require('./routes')

const PORT = 32

mongoose.connect("mongodb+srv://admin:admin@uit-elearning.uqfe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors());
routers(app)

app.listen(PORT, () => console.log('Server Started'))