// require('dotenv').config()

const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');

app.use(cors());

const PORT = 32

mongoose.connect("mongodb+srv://admin:admin@uit-elearning.uqfe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())


const route = require('./routes');
route(app);


app.listen(PORT, () => console.log('Server Started'))