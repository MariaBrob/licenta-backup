const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const logger = require("morgan");
const flash = require("connect-flash");

const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const busboy = require("connect-busboy");

const users = require("./routes/users.js");
const members = require("./routes/members.js");
const projects = require("./routes/projects");
const departments = require("./routes/departments");

const mongoose = require("mongoose");
const passport = require("passport");
const db = require("./config/keys").mongoURL;
const uristring = require("./config/keys").uristring;

// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch((err) => console.log(err));

mongoose
  .connect(uristring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(flash());
app.set("view engine", "html");
app.use(logger("dev"));
app.use(busboy());

app.use("/api/users", users);
app.use("/api/members", members);
app.use("/api/projects", projects);
app.use("/api/departments", departments);

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
