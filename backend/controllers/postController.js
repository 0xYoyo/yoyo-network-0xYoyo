const Blacklist = require("../models/blacklist");
const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const latestPosts = await Post.find({
    $or: [{ author: { $in: req.user.following } }, { author: req.user._id }],
  })
    .sort({ timestamp: -1 })
    .limit(10);
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
    .isLength({ min: 1, max: 250 })
    .escape()
    .withMessage("Content must be between 1 and 250 characters."),
  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    console.log(req.user);
    // Create post
    let post;
    if (req.file) {
      post = new Post({
        author: req.user._id,
        postContent: req.body.postContent,
        pictureUrl: req.file.path,
      });
    } else {
      post = new Post({
        author: req.user._id,
        postContent: req.body.postContent,
      });
    }

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
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ success: false, msg: "post not found" });
  }
  if (post.author.valueOf() === req.user._id.valueOf()) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { posts: req.params.id } },
      { new: true }
    );
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.json([deletedPost, updatedUser]);
  } else {
    console.log(post.author.valueOf());
    console.log(req.user._id.valueOf());
    res.status(403).json({ success: false, msg: "you are not the author" });
  }
});

// Handle post like on PUT
exports.post_like = asyncHandler(async (req, res, next) => {
  const isLiked = await Post.find({ likedBy: req.user._id });
  if (isLiked && isLiked.length) {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likedBy: req.user._id } },
      { new: true }
    );
    res.json(updatedPost);
  } else {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likedBy: req.user._id } },
      { new: true }
    );
    res.json(updatedPost);
  }
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
