const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const userSchema = {
  id: String,
  password: String,
  salt: String,
};

module.exports = mongoose.model("useSchema", userSchema);
