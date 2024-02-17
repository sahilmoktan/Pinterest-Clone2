var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");

/* GET profile page. */
// router.get("/profile", function (req, res, next) {
//   res.render("profile");
// });

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/* Post register page. */
router.post("/register", function (req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
  });
  userModel.register(data, req.body.cPassword).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

/* Post login page. */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/profile",
  }),
  function (req, res, next) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
