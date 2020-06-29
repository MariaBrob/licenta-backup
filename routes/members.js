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

router.post("/updateVolunteer", (req, res) => {
  Volunteer.updateOne(
    { _id: req.body._id ? req.body._id : req.body.id },
    {
      name: req.body.name,
      email: req.body.email,
      work_email: req.body.work_email,
      phone: req.body.phone,
      university: req.body.university,
      department: req.body.department,
      start_year: req.body.start_year,
      end_year: req.body.end_year,
    }
  )
    .then(() => {
      Volunteer.find({})
        .then((vol) => {
          res.json(vol);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Error updating volunteer");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error updating volunteer");
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

router.post("/updateVolunteerPointsFinishTask", (req, res) => {
  const { volunteer_id, year, type_finished, task_difficulty } = req.body;

  Volunteer.findOne({
    _id: volunteer_id,
  })
    .then((resp) => {
      let vol_points = resp.points;
      let year_index = vol_points.findIndex(({ year }) => year == year);

      if (type_finished === "finished") {
        if (task_difficulty === "Low") {
          if (year_index === -1) {
            vol_points.push({ year: year, points: 10 });
          } else {
            vol_points[year_index].points += 10;
          }
        } else if (task_difficulty === "Medium") {
          if (year_index === -1) {
            vol_points.push({ year: year, points: 20 });
          } else {
            vol_points[year_index].points += 20;
          }
        } else if (task_difficulty === "High") {
          if (year_index === -1) {
            vol_points.push({ year: year, points: 30 });
          } else {
            vol_points[year_index].points += 30;
          }
        }
      } else if (type_finished === "finished with problems") {
        if (task_difficulty === "Low") {
          if (year_index === -1) {
            vol_points.push({ year: year, points: -10 });
          } else {
            vol_points[year_index].points -= 10;
          }
        } else if (task_difficulty === "Medium") {
          if (year_index === -1) {
            vol_points.push({ year: year, points: -20 });
          } else {
            vol_points[year_index].points -= 20;
          }
        } else if (task_difficulty === "High") {
          if (year_index === -1) {
            vol_points.push({ year: year, points: -30 });
          } else {
            vol_points[year_index].points -= 30;
          }
        }
      }

      Volunteer.updateOne(
        { _id: volunteer_id },
        {
          points: vol_points,
        }
      )
        .then(() => {
          Volunteer.find({})
            .then((vol) => {
              res.json(vol);
            })
            .catch((err) => {
              console.log(err);
              return res
                .status(500)
                .send({ message: "Error updating volunteer points" });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            message: "Error updating volunteer points",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error updating volunteer points" });
    });
});

router.post("/updateVolunteerPointsNewTask", (req, res) => {
  const { volunteer_id, year, task_difficulty } = req.body;

  Volunteer.findOne({
    _id: volunteer_id,
  })
    .then((resp) => {
      let vol_points = resp.points;
      let year_index = vol_points.findIndex(({ year }) => year == year);

      if (year_index === -1) {
        vol_points.push({ year: year, points: 25 });
      } else {
        vol_points[year_index].points += 25;
      }

      Volunteer.updateOne(
        { _id: volunteer_id },
        {
          points: vol_points,
        }
      )
        .then(() => {
          Volunteer.find({})
            .then((vol) => {
              res.json(vol);
            })
            .catch((err) => {
              console.log(err);
              return res
                .status(500)
                .send({ message: "Error updating volunteer points" });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            message: "Error updating volunteer points",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error updating volunteer points" });
    });
});

router.post("/getBest10VolunteersbyYear", (req, res) => {
  const { year } = req.body;
  Volunteer.find({})
    .then((resp) => {
      var vol_array = [];

      resp.forEach((element) => {
        if (element.points.length > 0) {
          element.points.forEach((pyear) => {
            if (pyear.year === year) {
              console.log(pyear);
              vol_array.push({
                _id: element._id,
                name: element.name,
                department: element.department,
                points: element.points[0].points,
              });
            }
          });
        }
      });

      vol_array = vol_array.sort((a, b) => (a.points < b.points ? 1 : -1));

      console.log(vol_array);

      res.json(vol_array);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
