const express = require("express");
const router = express.Router();
const Volunteer = require("../models/volunteers.js");

router.post("/addVolunteer", (req, res) => {
  console.log(req.body);
  const newVolunteer = new Volunteer({
    name: req.body.name,
    email: req.body.email,
    work_email: req.body.work_email,
    phone: req.body.phone,
    university: req.body.university,
    department: req.body.department,
    function: req.body.function,
    start_year: req.body.start_year,
    end_year: "present",
  });

  newVolunteer
    .save()
    .then((volunteer) => res.json(volunteer))
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getVolunteers", (req, res) => {
  Volunteer.find({})
    .then((volunteers) => {
      res.json(volunteers);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getVolunteerByID/:id", (req, res) => {
  Volunteer.find({ _id: req.params.id })
    .then((volunteer) => {
      console.log(volunteer);
      res.json(volunteer);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getVolunteersByDepartment", (req, res) => {
  Volunteer.find({ department: "Board" })
    .then((volunteers) => {
      res.json(volunteers);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.post("/deleteVolunteer", (req, res) => {
  Volunteer.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      res.json("deleted");
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

module.exports = router;
