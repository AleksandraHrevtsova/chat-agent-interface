const mongoose = require("mongoose");

const User = mongoose.Schema({
  profile: {
    id: String,
    name: String,
    avatar: String,
    country: String,
    language: String,
    apiVersion: Number
  }
});

module.exports = mongoose.model("User", User);
