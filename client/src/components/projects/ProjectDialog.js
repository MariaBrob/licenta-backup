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
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import { useSelector, useDispatch } from "react-redux";
import { getProjectByID, getProjectTasks } from "../../actions/projectsActions";

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
  pos: {
    marginBottom: 12,
  },
  bullet: {
    paddingLeft: "10px",
    paddingRight: "10px",
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
                            <Typography variant="h5" component="h2">
                              <b>General informations</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Project manager: <b>{selectedProject.pm}</b>
                              <IconButton>
                                <RemoveRedEye />
                              </IconButton>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Mentor: {selectedProject.mentor}
                              <IconButton>
                                <RemoveRedEye />
                              </IconButton>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Budget: {selectedProject.budget}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Status: {selectedProject.status}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOpenAddTaskDialog()}
                            >
                              Print sent
                            </Button>
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
                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="h5" component="h2">
                              <b>Team</b>
                            </Typography>
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
                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="h5" component="h2">
                              <b>Tasks</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            {renderTasksTable()}
                            {/* <TasksTable /> */}
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
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenAddTaskDialog()}
        >
          Add comment
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenTeamDialog()}
        >
          Edit team
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenAddTaskDialog()}
        >
          Add task
        </Button>
      </DialogActions>

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
