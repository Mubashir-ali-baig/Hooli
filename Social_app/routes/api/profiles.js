 const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfile = require("../../validation/profile");
const validateExperience = require("../../validation/experience");

router.get("/test", () => console.log("profiles here"));

//current user profile  --> GET Req
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No profile of this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(error => res.status(400).json(error));
  }
);

//public routes

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Profile not found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Profile not found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

//get all profiles
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfiles = "No profiles found";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(400).json({ profile: "No profiles found " }));
});

//create user profile  -->POST Req
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id; //the logged_in user
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubProfile)
      profileFields.githubProfile = req.body.githubProfile;

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    profileFields.social = {};
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "Handle exists";
              res.status(400).json(errors);
            }
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      });
  }
);

// add experience
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperience(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        position: req.body.position,
        company: req.body.company,
        from: req.body.from,
        current: req.body.current
      };
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//delete experience
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const index = profile.experience
          .map(item => item.id) // maps the id
          .indexOf(req.params.exp_id);  // matches  exp_id with the mapped ids

        profile.experience.splice(index, 1); // removes from the index position

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//delete profile
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
