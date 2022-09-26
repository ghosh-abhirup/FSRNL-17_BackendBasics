var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
//ENV FILE
require("dotenv").config();

//
const bookRouter = require(path.join(__dirname, "./routes/book.router"));
const userRouter = require(path.join(__dirname, "./routes/user.router"));

//require('dotenv').config();

mongoose.connect(process.env.MONGO_DB);

var db = mongoose.connection;

db.on("error", () => {
  console.log("ERROR");
});

db.once("open", () => {
  console.log("Successful connection");
});

app.use(bodyParser.json());
app.use(cors());
//Router joins
app.use("/api", bookRouter);
//User api
app.use("/api", userRouter);

//Server allocation
app.listen(process.env.PORT, () => {
  console.log(`Starting server at localhost ${process.env.PORT}`);
});
