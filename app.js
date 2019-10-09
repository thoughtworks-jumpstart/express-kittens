const express = require("express");
const app = express();

if (app.get("env") !== "test") {
  require("./db");
}

app.use(express.json());

const kittens = require("./routes/kittens");
app.use("/kittens", kittens);

const owners = require("./routes/owners");
app.use("/owners", owners);

module.exports = app;
