const mongoose = require("mongoose");

const kittenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3,
    lowercase: true
  },
  age: {type: Number, min: 0, max: 20},
  sex: {type: String, enum: ["male", "female"]}
});

const Kitten = mongoose.model("Kitten", kittenSchema);

module.exports = Kitten;
