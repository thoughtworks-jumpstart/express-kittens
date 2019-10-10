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
    res.send(owners);
  } catch (err) {
    next(err);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const owner = new Owner(req.body);
    await Owner.init();
    const newOwner = await owner.save();
    res.send(newOwner);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const owner = await Owner.findOne({username});
    const bcrypt = require("bcryptjs");
    const result = await bcrypt.compare(password, owner.password);

    if (!result) {
      throw new Error("Login failed");
    }

    res.send("You're now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.status = 400;
    }
    next(err);
  }
});

module.exports = router;
