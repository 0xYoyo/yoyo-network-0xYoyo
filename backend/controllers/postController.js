const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const latestPosts = await Post.find().sort({ timestamp: -1 }).limit(3);
  res.json(latestPosts);
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");

  if (post === null) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json(post);
});

// Handle post create on POST.
exports.post_create = [
  body("postContent")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Content must be specified"),
  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    console.log(req.user);
    // Create post
    const post = new Post({
      author: req.user._id,
      postContent: req.body.postContent,
    });

    if (!errors.isEmpty()) {
      res.json({
        post: post,
        errors: errors.array(),
      });
      return;
    } else {
      const newPost = await post.save();
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { posts: newPost._id } },
        { new: true }
      );

      res.json([newPost, updatedUser]);
    }
  }),
];

// Handle post delete on DELETE.
exports.post_delete = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  res.json([deletedPost, updatedUser]);
});

// Handle post like on POST/PUT
exports.post_like = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED - post_like");
});

/// OPTIONAL ///
// <--- Uncomment in case of need --->

// Handle post edit on PUT.
// exports.post_edit_put = asyncHandler(async (req, res, next) => {
//   const post = await Post.findById(req.params.id);
//   const newPost = new Post({
//     ...post,
//     <--- Changes --->,
//     _id: post._id,
//   });
//   changedPost = await Post.findByIdAndUpdate(req.params.id, newPost, {});
//   res.json(changedPost);
// });

// Display list of all posts.
// exports.post_list = asyncHandler(async (req, res, next) => {
//   const allPosts = await Post.find().sort({ timestamp: -1 });
//   res.json(allPosts);
// });
