const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

if (app.get("env") !== "test") {
  require("./db");
}

const corsOptions = {
  credentials: true,
  allowedHeaders: "content-type",
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

const kittens = require("./routes/kittens");
app.use("/kittens", kittens);

const owners = require("./routes/owners");
app.use("/owners", owners);

module.exports = app;
