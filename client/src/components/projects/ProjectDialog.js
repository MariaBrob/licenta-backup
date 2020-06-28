import React from "react";
import {
  withStyles,
  makeStyles,
  Button,
  Dialog,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import { useSelector, useDispatch } from "react-redux";
import { getProjectByID, getProjectTasks } from "../../actions/projectsActions";

import ProjectDetails from "./dialogs/ProjectDetails";
import EditTeamDialog from "./dialogs/EditTeamDialog";
import TasksTable from "./dialogs/TasksTable";
import AddTaskDialog from "./dialogs/AddTaskDialog";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 500,
    minHeight: 500,
    overflowY: "auto",
  },
  cardTitle: {
    marginBottom: "20px",
  },
  pos: {
    marginBottom: 12,
  },
  bullet: {
    // paddingLeft: "10px",
    paddingRight: "10px",
  },
  littleEye: {
    fontSize: "1.2rem",
    paddingLeft: "2px",
  },
  littleEyeButton: {
    paddingLeft: "4px",
    paddingRight: "0px",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const selectedProjectTasks = useSelector(
    (state) => state.projects.selectedProjectTasks
  );
  const departments = useSelector((state) => state.departments.allDepartments);
  const [openTeamDialog, setOpenTeamDialog] = React.useState(false);
  const [openAddTaskDialog, setOpenAddTaskDialog] = React.useState(false);
  // const [openVolunteerDialog, setOpenVolunteerDialog] = React.useState(false);

  const bull = <span className={classes.bullet}>•</span>;

  const handleOpenTeamDialog = () => {
    setOpenTeamDialog(true);
  };

  const handleCloseTeamDialog = () => {
    dispatch(getProjectByID(selectedProject._id));
    setOpenTeamDialog(false);
  };

  const handleOpenAddTaskDialog = () => {
    setOpenAddTaskDialog(true);
  };

  const handleCloseAddTaskDialog = () => {
    dispatch(getProjectTasks(selectedProject._id));
    setOpenAddTaskDialog(false);
  };

  // const handleOpenVolunteerDialog = () => {
  //   setOpenVolunteerDialog(true);
  // };

  // const handleCloseVolunteerDialog = () => {
  //   // dispatch(getProjectTasks(selectedProject._id));
  //   setOpenVolunteerDialog(false);
  // };

  const renderTasksTable = () => {
    if (selectedProjectTasks !== null) {
      return <TasksTable />;
    } else {
      return null;
    }
  };

  return (
    <Dialog onClose={props.handleClose} maxWidth={"xl"} open={props.open}>
      <DialogTitle onClose={props.handleClose}>
        <b>
          {selectedProject.year} {selectedProject.name}
        </b>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card className={classes.root} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography
                              variant="h5"
                              component="h2"
                              className={classes.cardTitle}
                            >
                              <b>General informations</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <ProjectDetails />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={3}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card className={classes.root} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <CardContent>
                        <Grid
                          container
                          spacing={2}
                          className={classes.cardTitle}
                        >
                          <Grid item md={8}>
                            <Typography variant="h5" component="h2">
                              <b>Team</b>
                            </Typography>
                          </Grid>
                          <Grid container item md={4} justify="flex-end">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOpenTeamDialog()}
                            >
                              Edit team
                            </Button>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          {departments.map((dep, index) => {
                            if (
                              selectedProject.team[0][dep.name].length !== 0
                            ) {
                              return (
                                <Grid item md={6} key={index}>
                                  <Typography
                                    variant="subtitle1"
                                    component="h2"
                                  >
                                    {dep.name}
                                  </Typography>

                                  {selectedProject.team[0][dep.name].map(
                                    (element, index) => {
                                      return (
                                        <Box key={index}>
                                          <Typography
                                            variant="subtitle2"
                                            color="textSecondary"
                                          >
                                            {bull}
                                            &nbsp;
                                            {element.name}
                                            <IconButton
                                              className={
                                                classes.littleEyeButton
                                              }
                                            >
                                              <RemoveRedEye
                                                className={classes.littleEye}
                                              />
                                            </IconButton>
                                          </Typography>
                                        </Box>
                                      );
                                    }
                                  )}
                                </Grid>
                              );
                            } else {
                              return (
                                <Grid item md={6} key={index}>
                                  <Typography
                                    variant="subtitle1"
                                    component="h2"
                                  >
                                    {dep.name}
                                  </Typography>
                                  <Box>
                                    <Typography
                                      variant="subtitle2"
                                      color="textSecondary"
                                    >
                                      No volunteers yet
                                    </Typography>
                                  </Box>
                                </Grid>
                              );
                            }
                          })}
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card className={classes.root} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <CardContent>
                        <Grid
                          container
                          spacing={2}
                          className={classes.cardTitle}
                        >
                          <Grid item md={8}>
                            <Typography variant="h5" component="h2">
                              <b>Tasks</b>
                            </Typography>
                          </Grid>
                          <Grid container item md={4} justify="flex-end">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOpenAddTaskDialog()}
                            >
                              Add task
                            </Button>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            {renderTasksTable()}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <EditTeamDialog
        open={openTeamDialog}
        handleClose={handleCloseTeamDialog}
      />
      <AddTaskDialog
        open={openAddTaskDialog}
        handleClose={handleCloseAddTaskDialog}
      />
    </Dialog>
  );
}
