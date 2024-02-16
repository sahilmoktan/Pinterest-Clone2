const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

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

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
