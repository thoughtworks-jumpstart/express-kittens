const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
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

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
