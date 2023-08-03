const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  bio: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  pfpUrl: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dhxnvmhz2/image/upload/v1691074134/yoyo_network/profile_nd5iwd_zr7e8t.jpg",
  },
});

module.exports = mongoose.model("User", UserSchema);
