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

// ***TODO***
exports.user_edit = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED - user_edit");
});

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
