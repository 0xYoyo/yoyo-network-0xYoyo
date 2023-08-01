const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.user_my_profile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("posts")
    .populate("followers")
    .populate("following")
    .exec();
  res.json(user);
});

exports.user_list = asyncHandler(async (req, res, next) => {
  const nonFollowed = await User.find({
    followers: { $ne: req.user._id },
    _id: { $ne: req.user._id },
  }).limit(10);
  res.json(nonFollowed);
});

exports.user_detail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("posts").exec();
  res.json(user);
});

exports.user_edit = [
  body("displayName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Display name must be specified"),
  body("bio")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Bio must be between 1 and 100 characters"),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        displayName: req.body.displayName,
        bio: req.body.bio,
        errors: errors.array(),
      });
      return;
    } else {
      if (req.user._id.valueOf() === req.params.id) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { displayName: req.body.displayName, bio: req.body.bio } },
          { new: true }
        );
        res.json(updatedUser);
      } else {
        res
          .status(403)
          .json({ success: false, msg: "you are not the profile owner" });
      }
    }
  }),
];

exports.user_followers = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("followers").exec();
  res.json(user);
});

exports.user_following = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("following").exec();
  res.json(user);
});

exports.user_follow = asyncHandler(async (req, res, next) => {
  const isFollowed = await User.find({ followers: req.user._id });
  if (isFollowed && isFollowed.length) {
    const updatedUserFollowed = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    const updatedUserFollowing = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { following: req.params.id } },
      { new: true }
    );

    res.json([updatedUserFollowed, updatedUserFollowing]);
  } else {
    const updatedUserFollowed = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { followers: req.user._id } },
      { new: true }
    );

    const updatedUserFollowing = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { following: req.params.id } },
      { new: true }
    );

    res.json([updatedUserFollowed, updatedUserFollowing]);
  }
});
