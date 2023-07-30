const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postContent: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);

// Add in case of multi-user implementation:
// createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
