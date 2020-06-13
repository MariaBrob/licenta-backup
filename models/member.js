const mongoose = require("mongoose");

var memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    work_email: String,
    phone: String,
    address: String,
    statut: String,
    function: String,
    start_year: String,
    end_year: String,
    contract_nr: String,
});

module.exports = Member = mongoose.model("members", memberSchema);