const Comment = require("../models/comment");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Handle comment create on POST.
exports.comment_create = [
  body("commentContent")
    .trim()
    .isLength({ min: 1, max: 200 })
    .escape()
    .withMessage("Content must be between 1 and 200 characters"),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    // Create comment
    const comment = new Comment({
      author: req.user._id,
      commentContent: req.body.commentContent,
      parentPost: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.json({
        comment: comment,
        errors: errors.array(),
      });
      return;
    } else {
      const newComment = await comment.save();
      const populatedComment = await newComment.populate("author");
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: newComment._id } },
        { new: true }
      );
      res.json([populatedComment, updatedPost]);
    }
  }),
];

// Handle comment delete on DELETE.
exports.comment_delete = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentid);
  if (!comment) {
    res.status(404).json({ success: false, msg: "comment not found" });
  }
  if (comment.author.valueOf() === req.user._id.valueOf()) {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { comments: req.params.commentid } },
      { new: true }
    );
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentid
    );
    res.json([deletedComment, updatedPost]);
  } else {
    console.log(comment.author.valueOf());
    console.log(req.user._id.valueOf());
    res.status(403).json({ success: false, msg: "you are not the author" });
  }
});
