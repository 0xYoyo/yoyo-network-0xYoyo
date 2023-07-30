const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Handle comment create on POST. ***TODO***
exports.comment_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified"),
  body("commentContent")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified"),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    // Create comment
    const comment = new Comment({
      name: req.body.name,
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
      res.json(newComment);
    }
  }),
];

// Handle comment delete on DELETE. ***TODO***
exports.comment_delete = asyncHandler(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.commentid);
  res.json(deletedComment);
});
