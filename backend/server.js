// require('dotenv').config()

const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT } = require("./constants");

global.__basedir = __dirname;

app.use(cors());
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://admin:admin@uit-elearning.uqfe4.mongodb.net/sample?retryWrites=true&w=majority"
);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const route = require("./routes");
route(app);

app.listen(PORT, () => console.log("Server Started " + PORT));
