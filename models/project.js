const mongoose = require("mongoose");

var projectSchema = new mongoose.Schema(
  {
    name: String,
    year: String,
    pm: String,
    mentor: String,
    team: Array,
    team_id: Array,
    tasks: Array,
    budget: Number,
    status: String,
  },
  {
    versionKey: false,
  }
);

module.exports = Project = mongoose.model("projects", projectSchema);
