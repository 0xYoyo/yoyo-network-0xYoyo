const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.user_list_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED - user_list_get");
});

exports.user_edit_put = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED - user_edit_put");
});
exports.user_detail_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED - user_detail_get");
});
