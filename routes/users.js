const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: "zaq12wsx",
        role: req.body.role,
        department: req.body.department,
        project_id: req.body.project_id,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() => {
              User.find({})
                .then((users) => {
                  res.json(users);
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(500).send({
                    message: "Error retrieving departments.",
                  });
                });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role,
          project_id: user.project_id,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            console.log(token);
            res.json({
              success: true,
              user_id: user._id,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/getAllUsers/", (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving departments.",
      });
    });
});

router.get("/getUser/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.json(user);
      console.log(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving departments.",
      });
    });
});

router.post("/updateUser", (req, res) => {
  console.log(req.body);
  User.updateOne(
    { _id: req.body._id },
    {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      department: req.body.department,
    }
  )
    .then(() => {
      User.find({})
        .then((users) => {
          res.json(users);
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({
            message: "Error retrieving departments.",
          });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving departments.",
      });
    });
});

router.post("/deleteUser", (req, res) => {
  console.log(req.body);
  User.deleteOne({ _id: req.body._id })
    .then(() => {
      User.find({})
        .then((users) => {
          res.json(users);
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({
            message: "Error retrieving departments.",
          });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving departments.",
      });
    });
});

module.exports = router;
