// const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { issueJWT } = require("../utils/issueJWT");
const { validatePassword } = require("../utils/validatePassword");
const Blacklist = require("../models/blacklist");

// Handle register.
exports.register_post = [
  body("displayName")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage("Display name must be between 1 and 50 characters."),
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape()
    .withMessage("Username must be between 1 and 20 characters."),
  body("password")
    .trim()
    .isLength({ min: 1, max: 200 })
    .escape()
    .withMessage("Password must be between 1 and 200 characters."),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.json({
        displayName: req.body.displayName,
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) return next(err);

        const user = new User({
          displayName: req.body.displayName,
          username: req.body.username,
          password: hashedPassword,
        });

        const newUser = await user.save();
        const jwt = issueJWT(newUser);
        res.json({
          success: true,
          user: newUser,
          token: jwt.token,
          expiresIn: jwt.expires,
        });
      });
    }
  }),
];

// Handle login.
exports.login_post = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape()
    .withMessage("Username must be between 1 and 20 characters."),
  body("password")
    .trim()
    .isLength({ min: 1, max: 200 })
    .escape()
    .withMessage("Password must be between 1 and 200 characters."),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.json({
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    } else {
      // Validate user
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(401).json({ success: false, msg: "could not find user" });
      }
      // Validate password
      const isValid = await validatePassword(req.body.password, user.password);
      console.log(isValid);
      if (isValid === true) {
        const jwt = issueJWT(user);
        res.status(200).json({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    }
  }),
];

// Handle logout on PUT.
exports.logout_post = asyncHandler(async (req, res, next) => {
  const updatedBlacklist = await Blacklist.findOneAndUpdate(
    {},
    { $push: { tokens: req.headers.authorization.split(" ")[1] } },
    { new: true }
  );
  res.json(updatedBlacklist);
});

// Handle login as a guest on POST.
exports.guest_login_post = asyncHandler(async (req, res, next) => {
  const demoUser = await User.findOne({ username: process.env.DEMO_USERNAME });
  if (!demoUser) {
    res.status(401).json({ success: false, msg: "could not find user" });
  }
  // Validate password
  const isValid = await validatePassword(
    process.env.DEMO_PASSWORD,
    demoUser.password
  );
  console.log(isValid);
  if (isValid === true) {
    const jwt = issueJWT(demoUser);
    res.status(200).json({
      success: true,
      user: demoUser,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } else {
    res
      .status(401)
      .json({ success: false, msg: "you entered the wrong password" });
  }
});
