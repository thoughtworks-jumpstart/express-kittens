const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ownerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
    // select: false
  },
  firstName: String,
  lastName: String,
  salutation: {
    type: String,
    enum: ["Dr", "Mr", "Mrs", "Ms", "Miss", "Mdm"]
  }
});

ownerSchema.virtual("fullName").get(function() {
  return `${this.salutation} ${this.firstName} ${this.lastName}`;
});

ownerSchema.virtual("reverseName").get(function() {
  return `${this.lastName}, ${this.firstName}`;
});

ownerSchema.pre("save", async function(next) {
  const rounds = 10;
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
