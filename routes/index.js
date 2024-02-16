var express = require("express");
var router = express.Router();

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

module.exports = router;
