const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema(
  {
    project: String,
    team: Object,
    team_id: Array,
    difficulty: String,
    deadline: Date,
    description: String,
    status: String,
  },
  {
    versionKey: false,
  }
);

module.exports = Task = mongoose.model("tasks", taskSchema);
