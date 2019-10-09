const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner");

router.get("/", async (req, res, next) => {
  try {
    const owners = await Owner.find();
    res.send(owners);
  } catch (err) {
    next(err);
  }
});

router.get("/:firstName", async (req, res, next) => {
  try {
    const firstName = req.params.firstName;
    const regex = new RegExp(firstName, "gi");
    const owners = await Owner.find({firstName: regex});
    res.send(person);
  } catch (err) {
    next(err);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const owner = new Owner(req.body);
    const savedOwner = await owner.save();
    res.send(savedOwner);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
