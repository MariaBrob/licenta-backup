import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { getUser } from "../../actions/authActions";
import {
  Button,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { getProjects } from "../../actions/projectsActions";

import Title from "./Title";

import { logoutUser } from "../../actions/authActions";
import { useEffect } from "react";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  link: {
    color: "#fff",
    textDecoration: "none !important",
    cursor: "pointer !important",
  },
  projects: {
    marginLeft: "15px",
  },
  logoutButton: {
    textTransform: "none",
    color: "#fff",
    paddingRight: "0px",
  },
  people: {
    flexGrow: 4,
    marginLeft: "15px",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [pmDisable, setPmDisable] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const [editableUser, setEditableUser] = React.useState(selectedUser);
  const projects = useSelector((state) => state.projects.allProjects);

  useEffect(() => {
    setEditableUser(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    dispatch(getUser(user.id));
    setEditableUser(selectedUser);

    if (user.role === "pm") {
      setPmDisable(true);
    } else {
      setPmDisable(false);
    }
    dispatch(getProjects());

    // eslint-disable-next-line
  }, []);

  const renderProjectsDropdown = () => {
    if (projects.length > 0) {
      return projects.map((project, index) => {
        return (
          <MenuItem key={index} value={project._id}>
            {`${project.name} ${project.year}`}
          </MenuItem>
        );
      });
    }
  };

  const renderPage = () => {
    if (editableUser !== null) {
      return (
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    label="Full name"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableUser.name}
                    onChange={(event) =>
                      setEditableUser({
                        ...editableUser,
                        name: event.target.value,
                      })
                    }
                    required
                    disabled={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableUser.email}
                    onChange={(event) =>
                      setEditableUser({
                        ...editableUser,
                        email: event.target.value,
                      })
                    }
                    required
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControl
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={editableUser.department}
                      onChange={(event) => {
                        setEditableUser({
                          ...editableUser,
                          department: event.target.value,
                        });
                      }}
                      disabled={true}
                    >
                      <MenuItem value={"Board"}>Board</MenuItem>
                      <MenuItem value={"HR"}>HR</MenuItem>
                      <MenuItem value={"PR"}>PR</MenuItem>
                      <MenuItem value={"FR"}>FR</MenuItem>
                      <MenuItem value={"Visual"}>Visual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <FormControl required fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      fullWidth
                      value={editableUser.role}
                      onChange={(event) => {
                        setEditableUser({
                          ...editableUser,
                          role: event.target.value,
                        });
                      }}
                      disabled={true}
                    >
                      <MenuItem value={"hr"}>HR</MenuItem>
                      <MenuItem value={"board"}>Board</MenuItem>
                      <MenuItem value={"pm"}>Project manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={10}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel>Project</InputLabel>
                    <Select
                      value={editableUser.project_id}
                      onChange={(event) => {
                        setEditableUser({
                          ...editableUser,
                          project_id: event.target.value,
                        });
                      }}
                      disabled={true}
                    >
                      <MenuItem value="" disabled>
                        No project
                      </MenuItem>
                      {renderProjectsDropdown()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      );
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogoutClick = (event) => {
    event.preventDefault();
    dispatch(logoutUser);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={`bcolor ${classes.toolbar}`}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">ASFILS</Typography>
          <Typography
            onClick={() => {
              history.push("/projects");
            }}
            className={classes.projects}
          >
            <Link to="/projects" className={classes.link}>
              Projects
            </Link>
          </Typography>

          <Typography
            onClick={() => {
              history.push("/volunteers");
            }}
            className={classes.people}
          >
            <Link to="/volunteers" className={classes.link}>
              Volunteers
            </Link>
          </Typography>

          <Typography
            onClick={() => {
              history.push("/profile");
            }}
          >
            <Link to="/dashboard" className={classes.link}>
              {auth.user.name}
            </Link>
          </Typography>
          <Button
            className={classes.logoutButton}
            onClick={() => onLogoutClick}
          >
            <ExitToAppRoundedIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              history.push("/profile");
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            disabled={pmDisable}
            onClick={() => {
              history.push("/volunteers-overview");
            }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Volunteers overview" />
          </ListItem>
          {/* <ListItem
            button
            disabled={pmDisable}
            onClick={() => {
              history.push("/projects-overview");
            }}
          >
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Projects overview" />
          </ListItem> */}
          <ListItem
            button
            onClick={() => {
              history.push("/users");
            }}
          >
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Paper>
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <Box m={2}>
                      <Title>User profile</Title>
                    </Box>
                  </Grid>
                </Grid>

                <Box m={2}>{renderPage()}</Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
