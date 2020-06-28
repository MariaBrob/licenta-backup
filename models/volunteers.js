const mongoose = require("mongoose");

var volunteerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    work_email: String,
    phone: String,
    university: String,
    department: String,
    function: String,
    start_year: String,
    end_year: String,
    points: Array,
  },
  {
    versionKey: false,
  }
);

module.exports = Volunteer = mongoose.model("volunteers", volunteerSchema);
