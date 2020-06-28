const mongoose = require("mongoose");

var projectSchema = new mongoose.Schema(
  {
    name: String,
    year: String,
    pm: String,
    pm_id: mongoose.Types.ObjectId,
    mentor: String,
    mentor_id: mongoose.Types.ObjectId,
    team: Array,
    team_id: Array,
    tasks: Array,
    budget: Number,
    status: String,
    date_finished: Date,
  },
  {
    versionKey: false,
  }
);

module.exports = Project = mongoose.model("projects", projectSchema);
