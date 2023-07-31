const express = require("express");
const router = express.Router();

// Require controller modules.
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");

const passport = require("passport");

/// POST ROUTES ///

// GET api home page feed, latest posts by user and followed users.
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  post_controller.index
);

// POST request for creating post.  NOTE This must come before routes that display post (uses id).
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_create
);

// DELETE request to delete post.
router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_delete
);

// PUT request to change post liked status.
router.put(
  "/post/:id/like",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_like
);

// GET request for a single post details.
router.get(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_detail
); // Also has comment list

/// COMMENT ROUTES ///

// POST request for creating comment under a post.
router.post(
  "/post/:id/comment/",
  passport.authenticate("jwt", { session: false }),
  comment_controller.comment_create
);

// DELETE request for deleting comment.
router.delete(
  "/post/:id/comment/:commentid",
  passport.authenticate("jwt", { session: false }),
  comment_controller.comment_delete
);

/// USER ROUTES ///

// GET request for getting logged in user profile.
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_my_profile
);

// GET request for exploring non-followed users.
router.get(
  "/profile/explore",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_list
);

// GET request for getting certain user information.
router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_detail
);

// PUT request to edit user profile details. ***TODO***
router.put(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_edit
);

// GET request for getting certain user followers.
router.get(
  "/profile/:id/followers",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_followers
);

// GET request for getting certain user following.
router.get(
  "/profile/:id/following",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_following
);

// PUT request for changing following status.
router.put(
  "/profile/:id/follow",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_follow
);

/// AUTHENTICATION ROUTES ///

// POST request for registering.
router.post("/register", auth_controller.register_post);

// POST request for logging in.
router.post("/login", auth_controller.login_post);

module.exports = router;

/// OPTIONAL ///
// <--- Uncomment in case of need --->

// PUT request to edit post.
// router.put(
//   "/post/:id",
//   passport.authenticate("jwt", { session: false }),
//   post_controller.post_edit
// );

// GET request for list of all published posts by a certain user.
// router.get("/posts", post_controller.post_list);
