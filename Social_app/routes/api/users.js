const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config/keys");
const passport = require("passport");
const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

router.get("/test", () => console.log("users here"));

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200", //size
      r: "pg", //rating --> Ex: pg-rated etc
      d: "mm" //default
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar: avatar,
      password: req.body.password
    });

    bcrypt.hash(newUser.password, 10, (err, hash) => {
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found ";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload

        // sign Token

        return jwt.sign(payload, secretKey, { expiresIn: 36000 }, function(
          err,
          token
        ) {
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      }
      errors.password = "Wrong password";
      return res.status(400).json(errors);
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "success" });
  }
);

module.exports = router;
