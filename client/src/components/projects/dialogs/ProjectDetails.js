import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Box,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import { useSelector, useDispatch } from "react-redux";
import { updateProject, finishProject } from "../../../actions/projectsActions";
import {
  getVolunteerByID,
  getVolunteerProjects,
  getComments,
} from "../../../actions/membersActions";

import VolunteerDialog from "../../volunteers/VolunteerDialog";
// import { updateVolunteerPointsFinishProject } from "../../../actions/membersActions";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: "10px",
  },
}));

export default function VolunteerDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const volunteers = useSelector((state) => state.volunteers.allVolunteers);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [editableProject, setEditableProject] = useState(selectedProject);
  const [disableEdit, setDisableEdit] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = React.useState(false);
  const year = new Date("01/01/2000").getFullYear();
  const years = Array.from(new Array(30), (val, index) => index + year);
  const [openDialog, setOpen] = React.useState(false);
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );

  const [pmDisable, setPmDisable] = React.useState(false);
  useEffect(() => {
    if (user.role === "pm") {
      setPmDisable(true);
    } else {
      setPmDisable(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setEditableProject(selectedProject);
    if (selectedProject.status !== "in progress") {
      setDisableEdit(true);
    } else {
      setDisableEdit(false);
    }
  }, [selectedProject]);

  const handleClickOpen = () => {
    setOpenFinishDialog(true);
  };

  const handleClose = () => {
    setOpenFinishDialog(false);
  };

  const handleOpenDialog = (id) => {
    setOpen(true);
    dispatch(getVolunteerProjects(id));
    dispatch(getVolunteerByID(id));
    dispatch(getComments(id));
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderVolunteerDialog = () => {
    if (selectedVolunteer !== null) {
      return (
        <VolunteerDialog open={openDialog} handleClose={handleCloseDialog} />
      );
    } else {
      return null;
    }
  };

  return (
    <Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(updateProject(editableProject));
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={8}>
            <TextField
              label="Project name"
              variant="outlined"
              className={classes.input}
              fullWidth
              value={editableProject.name}
              onChange={(event) =>
                setEditableProject({
                  ...editableProject,
                  name: event.target.value,
                })
              }
              disabled={disableEdit || pmDisable}
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            <FormControl
              variant="outlined"
              className={classes.input}
              fullWidth
              required
            >
              <InputLabel>Year</InputLabel>
              <Select
                value={editableProject.year}
                onChange={(event) =>
                  setEditableProject({
                    ...editableProject,
                    year: event.target.value,
                  })
                }
                label="Year"
                disabled={disableEdit || pmDisable}
              >
                {years.map((year, index) => {
                  return (
                    <MenuItem value={year} key={index}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            <FormControl
              variant="outlined"
              className={classes.input}
              fullWidth
              required
            >
              <InputLabel>Project manager</InputLabel>
              <Select
                value={editableProject.pm}
                onChange={(event) => {
                  setEditableProject({
                    ...editableProject,
                    pm: event.target.value,
                    pm_id: event.currentTarget.getAttribute("volunteer_id"),
                    old_pm_id: selectedProject.pm_id,
                  });
                }}
                label="Project manager"
                disabled={disableEdit || pmDisable}
              >
                {volunteers.map((vol, index) => {
                  return (
                    <MenuItem
                      key={index}
                      volunteer_id={vol._id}
                      value={vol.name}
                    >
                      {vol.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <IconButton onClick={() => handleOpenDialog(editableProject.pm_id)}>
              <RemoveRedEye />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            <FormControl
              variant="outlined"
              className={classes.input}
              fullWidth
              required
            >
              <InputLabel>Project mentor</InputLabel>
              <Select
                value={editableProject.mentor}
                onChange={(event) => {
                  setEditableProject({
                    ...editableProject,
                    mentor: event.target.value,
                    mentor_id: event.currentTarget.getAttribute("volunteer_id"),
                    old_mentor_id: selectedProject.mentor_id,
                  });
                }}
                label="Project mentor"
                disabled={disableEdit || pmDisable}
              >
                {volunteers.map((vol, index) => {
                  return (
                    <MenuItem
                      key={index}
                      volunteer_id={vol._id}
                      value={vol.name}
                    >
                      {vol.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <IconButton
              onClick={() => handleOpenDialog(editableProject.mentor_id)}
            >
              <RemoveRedEye />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            <TextField
              label="Budget"
              variant="outlined"
              className={classes.input}
              fullWidth
              value={editableProject.budget}
              onChange={(event) =>
                setEditableProject({
                  ...editableProject,
                  budget: event.target.value,
                })
              }
              disabled={disableEdit || pmDisable}
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            <TextField
              label="Status"
              variant="outlined"
              className={classes.input}
              fullWidth
              value={editableProject.status}
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={6}>
            <Button
              variant="outlined"
              disabled={pmDisable}
              size="small"
              type="submit"
            >
              Update details
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button
              variant="outlined"
              size="small"
              disabled={pmDisable}
              onClick={handleClickOpen}
            >
              Finish project
            </Button>
          </Grid>
        </Grid>
      </form>
      {renderVolunteerDialog()}
      <FinishProjectDialog open={openFinishDialog} handleClose={handleClose} />
    </Box>
  );
}

function FinishProjectDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [projectStatus, setProjectStatus] = useState(selectedProject.status);
  const [dateFinished, setDateFinished] = useState(new Date());

  useEffect(() => {
    setProjectStatus(selectedProject.status);
    setDateFinished(new Date());
  }, [selectedProject]);

  const handleFinish = () => {
    dispatch(finishProject(selectedProject._id, projectStatus, dateFinished));
    // dispatch(
    //   updateVolunteerPointsFinishProject(
    //     selectedProject.pm_id,
    //     selectedProject.mentor_id,
    //     dateFinished.getFullYear().toString()
    //   )
    // );
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle>Finish task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12}>
              The project is about to be finished. After this action it can no
              longer be modified.
            </Grid>
          </Grid>

          <Box mt={2} mb={2}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Task status</InputLabel>
                  <Select
                    value={projectStatus}
                    onChange={(event) => {
                      setProjectStatus(event.target.value);
                    }}
                  >
                    <MenuItem value={"in progress"}>In progress</MenuItem>
                    <MenuItem value={"finished"}>Finish</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box mt={2} mb={4}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    label="Deadline"
                    value={dateFinished}
                    onChange={(date) => {
                      setDateFinished(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleFinish()}
            color="primary"
            variant="outlined"
            autoFocus
          >
            Finish project
          </Button>
          <Button
            onClick={props.handleClose}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
