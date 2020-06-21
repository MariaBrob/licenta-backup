const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema(
  {
    volunteer_id: String,
    comment_by: String,
    comment: String,
    date: Date,
    points: String,
    result: String,
  },
  {
    versionKey: false,
  }
);

module.exports = Comment = mongoose.model("comments", commentSchema);
