const express = require("express");
const router = express.Router();
const Volunteer = require("../models/volunteers.js");
const Project = require("../models/project.js");
const Tasks = require("../models/task.js");

router.post("/addVolunteer", (req, res) => {
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
      res.json(volunteer);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getVolunteerProjects/:id", (req, res) => {
  const { id } = req.params;
  var vol_projects = [];

  Volunteer.find({ _id: id })
    .then((volunteer) => {
      Project.find({})
        .then((projects) => {
          projects.forEach((element) => {
            if (element.team_id.includes(id)) {
              vol_projects.push(element);
            }
          });
          console.log(vol_projects);
          res.json(vol_projects);
        })
        .catch((err) => {
          console.log(err);
          return res.json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getVolunteerProjectsTasks/:id", (req, res) => {
  const { id } = req.params;

  Project.find({ _id: id })
    .then((tasks) => {
      res.json(tasks);
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
