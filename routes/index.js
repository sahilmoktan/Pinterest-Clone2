var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");

passport.use(new localStrategy(userModel.authenticate()));

/* GET profile page. */
router.get("/profile", async function (req, res, next) {
  const user =  await userModel.findOne({username: req.session.passport.user})
  res.render("profile", {user});
});

router.post("/fileupload", upload.single("image"), async function (req, res, next) {
  const user =  await userModel.findOne({username: req.session.passport.user})
  user.profileImage = req.file.filename;
  await user.save()
  res.redirect("/profile")
});

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/* Post register page. */
// router.post("/register", function (req, res, next) {
//   const data = new userModel({
//     username: req.body.username,
//     email: req.body.email,
//   });
//   userModel.register(data, req.body.cPassword).then(function () {
//     passport.authenticate("local")(req, res, function () {
//       res.redirect("/profile");
//     });
//   });
// });
router.post("/register", isLoggedIn, async function (req, res, next) {
  try {
    const data = new userModel({
      username: req.body.username,
      email: req.body.email,
    });

    await userModel.register(data, req.body.cPassword);

    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  } catch (error) {
    console.error(error);
    // Handle the error (e.g., redirect to an error page)
  }
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

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
