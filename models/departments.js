const mongoose = require("mongoose");

var departmentSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = Departments = mongoose.model("departments", departmentSchema);
