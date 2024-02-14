const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pin2db");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileImage: String,
  post: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
