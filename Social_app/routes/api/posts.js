const express = require("express");
const router = express.Router();
const passport = require("passport");
const validatePost = require("../../validation/post");
const Profile = require("../../models/Profile");

const Post = require("../../models/Post");

router.get("/test", () => console.log("posts here"));

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ postNotFound: "No posts" }));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ postNotFound: "post not found" }));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ noAuthority: "user not authorized" });
          }
          post.remove().then(() => res.json({ success: "Delete successful" }));
        })
        .catch(() => res.status(404).json({ notFound: "no such post exists" }));
    });
  }
);

// like route
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "It is already liked" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(() => res.status(404).json({ notFound: "no such post exists" }));
    });
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status(400).json({ notLiked: "not liked by you" });
          }
          const index = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(index, 1);
          post.save().then(post => res.json(post));
        })
        .catch(() => res.status(404).json({ notFound: "no such post exists" }));
    });
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const comment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        post.comments.unshift(comment);
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ notFound: "no such post exists" }));
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentNotExist: "comment does not exist" });
        }
        const index = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(index, 1);
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ notFound: "no such post exists" }));
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const post = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });
    post.save().then(post => res.json(post));
  }
);

module.exports = router;
