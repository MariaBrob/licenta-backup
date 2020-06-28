import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Box,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useSelector, useDispatch } from "react-redux";
import {
  getProjects,
  updateTask,
  getProjectByID,
  getProjectTasks,
  finishTask,
} from "../../../actions/projectsActions";
import {
  returnVolunteerByID,
  updateVolunteerPointsFinishTask,
} from "../../../actions/membersActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddTaskDialog(props) {
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const selectedTask = useSelector(
    (state) => state.projects.selectedProjectTaskID
  );

  const [projectTeam, setProjectTeam] = React.useState([]);
  const [task, setTask] = React.useState(selectedTask);
  const [openFinishDialog, setOpenFinishDialog] = React.useState(false);
  const [disableEdit, setDisableEdit] = React.useState(false);

  React.useEffect(() => {
    let teamArray = [];
    selectedProject.team_id.forEach((element) => {
      returnVolunteerByID(element).then((resp) => {
        teamArray.push(resp.data[0]);
      });
    });

    setProjectTeam(teamArray);
  }, [selectedProject]);

  React.useEffect(() => {
    setTask(selectedTask);

    if (selectedTask.status !== "open") {
      setDisableEdit(true);
    } else {
      setDisableEdit(false);
    }
  }, [selectedTask]);

  const handleClickOpen = () => {
    setOpenFinishDialog(true);
  };

  const handleClose = () => {
    setOpenFinishDialog(false);
  };

  const handleSubmit = () => {
    task.team_id = [];
    task.team.forEach((element) => {
      task.team_id.push(element._id);
    });

    dispatch(updateTask(task));
    dispatch(getProjectTasks(selectedProject._id));
    dispatch(getProjectByID(selectedProject._id));
    props.handleClose();
  };

  const handleDiscard = () => {
    dispatch(getProjects());
    dispatch(getProjectTasks(selectedProject._id));
    dispatch(getProjectByID(selectedProject._id));
    props.handleClose();
  };

  const renderFinish = () => {
    if (selectedTask.status === "open") {
      return (
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Button
              onClick={() => {
                handleClickOpen();
              }}
              variant="outlined"
              color="primary"
              autoFocus
            >
              Finish task
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel>Task status</InputLabel>
              <Select value={task.status} disabled={disableEdit}>
                <MenuItem value={"open"}>Open</MenuItem>
                <MenuItem value={"finished"}>Finished</MenuItem>
                <MenuItem value={"finished with problems"}>
                  Finished with problems
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                fullWidth
                label="Deadline"
                value={task.date_finished}
                disabled={disableEdit}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box m={2}>
            <Autocomplete
              multiple
              options={projectTeam}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option._id === value._id}
              value={task.team}
              onChange={(event, newValue) => {
                setTask({ ...task, team: newValue });
              }}
              disableCloseOnSelect={true}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label={"Team"} />
              )}
              disabled={disableEdit}
            />
          </Box>

          <Box m={2}>
            <TextField
              label="Description"
              fullWidth
              multiline
              value={task.description}
              onChange={(event) => {
                setTask({ ...task, description: event.target.value });
              }}
              rows={4}
              variant="outlined"
              disabled={disableEdit}
            />
          </Box>

          <Box m={2}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="MM/dd/yyyy"
                    label="Deadline"
                    value={task.deadline}
                    onChange={(date) => {
                      setTask({ ...task, deadline: date });
                    }}
                    disabled={disableEdit}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={task.difficulty}
                    onChange={(event) => {
                      setTask({ ...task, difficulty: event.target.value });
                    }}
                    disabled={disableEdit}
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box m={2}>{renderFinish()}</Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="outlined"
            color="primary"
            autoFocus
            disabled={disableEdit}
          >
            Save
          </Button>
          <Button onClick={handleDiscard} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <FinishTaskDialog
        open={openFinishDialog}
        handleClose={handleClose}
        task={task}
      />
    </div>
  );
}

function FinishTaskDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedTask = useSelector(
    (state) => state.projects.selectedProjectTaskID
  );
  const [taskStatus, setTaskStatus] = useState(selectedTask.status);
  const [dateFinished, setDateFinished] = useState(new Date());

  useEffect(() => {
    setTaskStatus(selectedTask.status);
    setDateFinished(new Date());
  }, [selectedTask]);

  const handleFinish = () => {
    let team_id = [];
    props.task.team.forEach((element) => {
      team_id.push(element._id);
    });

    dispatch(finishTask(selectedTask._id, taskStatus, dateFinished));
    dispatch(
      updateVolunteerPointsFinishTask(
        team_id,
        dateFinished.getFullYear().toString(),
        taskStatus,
        selectedTask.difficulty
      )
    );
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
              The task is about to be finished. After this action it can no
              longer be modified.
            </Grid>
          </Grid>

          <Box mt={2} mb={2}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Task status</InputLabel>
                  <Select
                    value={taskStatus}
                    onChange={(event) => {
                      setTaskStatus(event.target.value);
                    }}
                  >
                    <MenuItem value={"open"}>Open</MenuItem>
                    <MenuItem value={"finished"}>Finish</MenuItem>
                    <MenuItem value={"finished with problems"}>
                      Finish with problems
                    </MenuItem>
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
            Finish task
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
