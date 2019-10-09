const express = require("express");
const router = express.Router();
const Kitten = require("../models/Kitten");

router.get("/", async (req, res, next) => {
  try {
    const kittens = await Kitten.find(req.query);
    res.send(kittens);
  } catch (err) {
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(name, "gi");
    const kittens = await Kitten.find({name: regex});
    console.log(kittens[0].id, kittens[0]._id, kittens[0].name);
    res.send(kittens);
  } catch (err) {
    next(err);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const kitten = new Kitten(req.body);
    await Kitten.init();
    const kittens = await kitten.save();
    res.send(kittens);
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    next(err);
  }
});

module.exports = router;
