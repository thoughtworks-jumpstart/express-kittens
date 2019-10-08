const express = require("express");
const app = express();

// connect to database
require("./db");

// add body parser
app.use(express.json());

// define routes
const kittens = require("./routes/kittens");
app.use("/kittens", kittens);

module.exports = app;
