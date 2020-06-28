const express = require("express");
const router = express.Router();
const Volunteer = require("../models/volunteers.js");
const Project = require("../models/project.js");
const Task = require("../models/task.js");

router.post("/addProject", (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    year: req.body.year,
    pm: req.body.pm,
    pm_id: req.body.pm_id,
    mentor: req.body.mentor,
    mentor_id: req.body.mentor_id,
    budget: req.body.budget,
    team: [
      {
        Board: [],
        HR: [],
        PR: [],
        FR: [],
        Visual: [],
      },
    ],
    status: "in progress",
  });

  newProject
    .save()
    .then(() => {
      Project.find({})
        .then((projects) => {
          //pm points
          Volunteer.findOne({
            _id: req.body.pm_id,
          })
            .then((resp) => {
              let vol_points = resp.points;
              let year_index = vol_points.findIndex(
                ({ year }) => year == req.body.year
              );

              if (year_index === -1) {
                vol_points.push({ year: req.body.year, points: 250 });
              } else {
                vol_points[year_index].points += 250;
              }

              Volunteer.updateOne(
                { _id: req.body.pm_id },
                {
                  points: vol_points,
                }
              )
                .then(() => {
                  //mentor points
                  Volunteer.findOne({
                    _id: req.body.mentor_id,
                  })
                    .then((resp) => {
                      let vol_points = resp.points;
                      let year_index = vol_points.findIndex(
                        ({ year }) => year == req.body.year
                      );

                      if (year_index === -1) {
                        vol_points.push({ year: req.body.year, points: 100 });
                      } else {
                        vol_points[year_index].points += 100;
                      }

                      Volunteer.updateOne(
                        { _id: req.body.mentor_id },
                        {
                          points: vol_points,
                        }
                      )
                        .then(() => {
                          res.json(projects);
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
                })
                .catch((err) => {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ message: "Error updating volunteer points" });
                });
            })
            .catch((err) => {
              console.log(err);
              return res
                .status(500)
                .json({ message: "Error updating volunteer points" });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ message: "Error inserting project" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error adding new project" });
    });
});

router.put("/updateProject", (req, res) => {
  console.log(req.body);
  Project.updateOne(
    { _id: req.body._id ? req.body._id : req.body.id },
    {
      name: req.body.name,
      year: req.body.year,
      pm: req.body.pm,
      pm_id: req.body.pm_id,
      mentor: req.body.mentor,
      mentor_id: req.body.mentor_id,
      budget: req.body.budget,
    }
  )
    .then(() => {
      if (
        req.body.old_pm_id !== undefined &&
        req.body.old_mentor_id === undefined
      ) {
        //update old pm points
        Volunteer.findOne({
          _id: req.body.old_pm_id,
        })
          .then((resp) => {
            let vol_points = resp.points;
            let year_index = vol_points.findIndex(
              ({ year }) => year == req.body.year
            );

            if (year_index === -1) {
              vol_points.push({ year: req.body.year, points: 0 });
            } else {
              vol_points[year_index].points -= 200;
            }

            Volunteer.updateOne(
              { _id: req.body.old_pm_id },
              {
                points: vol_points,
              }
            )
              .then(() => {
                //update new pm points
                Volunteer.findOne({
                  _id: req.body.pm_id,
                })
                  .then((resp) => {
                    let vol_points = resp.points;
                    let year_index = vol_points.findIndex(
                      ({ year }) => year == req.body.year
                    );

                    if (year_index === -1) {
                      vol_points.push({ year: req.body.year, points: 250 });
                    } else {
                      vol_points[year_index].points += 250;
                    }

                    Volunteer.updateOne(
                      { _id: req.body.pm_id },
                      {
                        points: vol_points,
                      }
                    )
                      .then(() => {
                        Project.find({})
                          .then((projects) => {
                            res.json(projects);
                          })
                          .catch((err) => {
                            console.log(err);
                            return res
                              .status(500)
                              .send({ message: "Error updating project" });
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
      } else if (
        req.body.old_pm_id === undefined &&
        req.body.old_mentor_id !== undefined
      ) {
        //update old mentor points
        Volunteer.findOne({
          _id: req.body.old_mentor_id,
        })
          .then((resp) => {
            let vol_points = resp.points;
            let year_index = vol_points.findIndex(
              ({ year }) => year == req.body.year
            );

            if (year_index === -1) {
              vol_points.push({ year: req.body.year, points: 0 });
            } else {
              vol_points[year_index].points -= 75;
            }

            Volunteer.updateOne(
              { _id: req.body.old_mentor_id },
              {
                points: vol_points,
              }
            )
              .then(() => {
                //update new mentor points
                Volunteer.findOne({
                  _id: req.body.mentor_id,
                })
                  .then((resp) => {
                    let vol_points = resp.points;
                    let year_index = vol_points.findIndex(
                      ({ year }) => year == req.body.year
                    );

                    if (year_index === -1) {
                      vol_points.push({ year: req.body.year, points: 100 });
                    } else {
                      vol_points[year_index].points += 100;
                    }

                    Volunteer.updateOne(
                      { _id: req.body.mentor_id },
                      {
                        points: vol_points,
                      }
                    )
                      .then(() => {
                        Project.find({})
                          .then((projects) => {
                            res.json(projects);
                          })
                          .catch((err) => {
                            console.log(err);
                            return res
                              .status(500)
                              .send({ message: "Error updating project" });
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
      } else if (
        req.body.old_pm_id !== undefined &&
        req.body.old_mentor_id !== undefined
      ) {
        //update old mentor points
        Volunteer.findOne({
          _id: req.body.old_mentor_id,
        })
          .then((resp) => {
            let vol_points = resp.points;
            let year_index = vol_points.findIndex(
              ({ year }) => year == req.body.year
            );

            if (year_index === -1) {
              vol_points.push({ year: req.body.year, points: 0 });
            } else {
              vol_points[year_index].points -= 75;
            }

            Volunteer.updateOne(
              { _id: req.body.old_mentor_id },
              {
                points: vol_points,
              }
            )
              .then(() => {
                //update new mentor points
                Volunteer.findOne({
                  _id: req.body.mentor_id,
                })
                  .then((resp) => {
                    let vol_points = resp.points;
                    let year_index = vol_points.findIndex(
                      ({ year }) => year == req.body.year
                    );

                    if (year_index === -1) {
                      vol_points.push({ year: req.body.year, points: 100 });
                    } else {
                      vol_points[year_index].points += 100;
                    }

                    Volunteer.updateOne(
                      { _id: req.body.mentor_id },
                      {
                        points: vol_points,
                      }
                    )
                      .then(() => {
                        //update old pm points
                        Volunteer.findOne({
                          _id: req.body.old_pm_id,
                        })
                          .then((resp) => {
                            let vol_points = resp.points;
                            let year_index = vol_points.findIndex(
                              ({ year }) => year == req.body.year
                            );

                            if (year_index === -1) {
                              vol_points.push({
                                year: req.body.year,
                                points: 0,
                              });
                            } else {
                              vol_points[year_index].points -= 200;
                            }

                            Volunteer.updateOne(
                              { _id: req.body.old_pm_id },
                              {
                                points: vol_points,
                              }
                            )
                              .then(() => {
                                //update new pm points
                                Volunteer.findOne({
                                  _id: req.body.pm_id,
                                })
                                  .then((resp) => {
                                    let vol_points = resp.points;
                                    let year_index = vol_points.findIndex(
                                      ({ year }) => year == req.body.year
                                    );

                                    if (year_index === -1) {
                                      vol_points.push({
                                        year: req.body.year,
                                        points: 250,
                                      });
                                    } else {
                                      vol_points[year_index].points += 250;
                                    }

                                    Volunteer.updateOne(
                                      { _id: req.body.pm_id },
                                      {
                                        points: vol_points,
                                      }
                                    )
                                      .then(() => {
                                        Project.find({})
                                          .then((projects) => {
                                            res.json(projects);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            return res.status(500).send({
                                              message: "Error updating project",
                                            });
                                          });
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                        return res.status(500).json({
                                          message:
                                            "Error updating volunteer points",
                                        });
                                      });
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    return res.status(500).json({
                                      message:
                                        "Error updating volunteer points",
                                    });
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
                            return res.status(500).json({
                              message: "Error updating volunteer points",
                            });
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
      } else {
        Project.find({})
          .then((projects) => {
            res.json(projects);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send({ message: "Error updating project" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error updating project" });
    });
});

router.post("/updateProjectTeam", (req, res) => {
  var newTeam = [
    {
      Board: req.body.board !== undefined ? req.body.board : [],
      HR: req.body.hr !== undefined ? req.body.hr : [],
      PR: req.body.pr !== undefined ? req.body.pr : [],
      FR: req.body.fr !== undefined ? req.body.fr : [],
      Visual: req.body.visual !== undefined ? req.body.visual : [],
    },
  ];

  Project.updateOne(
    { _id: req.body.id },
    { team: newTeam, team_id: req.body.team_id }
  )
    .then(() => {
      Project.find({})
        .then((projects) => {
          res.json(projects);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Error updating project");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error updating project");
    });
});

router.post("/addTask", (req, res) => {
  const newTask = new Task({
    team: req.body.taskTeam,
    team_id: req.body.allVolunteers,
    description: req.body.description ? req.body.description : "",
    project: req.body.project,
    difficulty: req.body.difficulty,
    deadline: req.body.deadline,
    status: "open",
  });

  newTask
    .save()
    .then(() => {
      res.send("ok");
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error adding task");
    });
});

router.post("/finishTask", (req, res) => {
  const { task_id, status, date_finished } = req.body;

  Task.updateOne(
    { _id: task_id },
    {
      status: status,
      date_finished: date_finished,
    }
  )
    .then(() => {
      Task.find({ _id: task_id })
        .then((task) => {
          res.json(task);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Error tinishing task");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error tinishing task");
    });
});

router.post("/finishProject", (req, res) => {
  const { project_id, status, date_finished } = req.body;
  console.log(req.body);

  Project.updateOne(
    { _id: project_id },
    {
      status: status,
      date_finished: date_finished,
    }
  )
    .then(() => {
      Project.findOne({ _id: project_id })
        .then((project) => {
          res.json(project);
        })
        .catch((err) => {
          console.log(err);
          return res.json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error tinishing project");
    });
});

router.post("/updateTask", (req, res) => {
  const { task } = req.body;

  Task.updateOne(
    { _id: task._id },
    {
      team: task.team,
      team_id: task.team_id,
      description: task.description,
      difficulty: task.difficulty,
      deadline: task.deadline,
    }
  )
    .then(() => {
      Project.find({})
        .then((task) => {
          res.json(task);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Error updating project");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error updating project");
    });
});

router.get("/getProjectTasks/:id", (req, res) => {
  Task.find({ project: req.params.id })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getProjectTaskByID/:id", (req, res) => {
  Task.find({ _id: req.params.id })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getProjects", (req, res) => {
  Project.find({})
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.get("/getProjectByID/:id", (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

router.post("/deleteProject", (req, res) => {
  Project.deleteOne({ _id: req.body._id })
    .then(() => {
      res.json("deleted");
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

module.exports = router;
