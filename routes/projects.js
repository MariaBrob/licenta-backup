const express = require("express");
const router = express.Router();
const Project = require("../models/project.js");
const Task = require("../models/task.js");

router.post("/addProject", (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    year: req.body.year,
    pm: req.body.pm,
    mentor: req.body.mentor,
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
          res.json(projects);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Error updating project");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error adding new project");
    });
});

router.put("/updateProject", (req, res) => {
  Project.updateOne(
    { _id: req.body.id },
    {
      name: req.body.name,
      year: req.body.year,
      pm: req.body.pm,
      mentor: req.body.mentor,
      budget: req.body.budget,
    }
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

router.post("/updateTask", (req, res) => {
  const { task } = req.body;
  console.log(task);
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
