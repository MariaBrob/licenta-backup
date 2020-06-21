import React from "react";
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
  addTask,
  getProjectByID,
  getProjectTasks,
} from "../../../actions/projectsActions";
import { returnVolunteerByID } from "../../../actions/membersActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddTaskDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  const [taskTeam, setTaskTeam] = React.useState([]);
  const [projectTeam, setProjectTeam] = React.useState([]);
  const [description, setDescription] = React.useState();
  const [deadline, setDeadline] = React.useState(new Date());
  const [difficulty, setDifficulty] = React.useState("Low");

  React.useEffect(() => {
    let teamArray = [];
    selectedProject.team_id.forEach((element) => {
      returnVolunteerByID(element).then((resp) => {
        teamArray.push(resp.data[0]);
      });
    });

    setProjectTeam(teamArray);
  }, [selectedProject]);

  const handleSubmit = () => {
    let allVolunteersTask = [];
    taskTeam.forEach((element) => {
      allVolunteersTask.push(element._id);
    });

    dispatch(
      addTask(
        selectedProject._id,
        taskTeam,
        allVolunteersTask,
        description,
        deadline,
        difficulty
      )
    );

    dispatch(getProjectTasks(selectedProject._id));
    props.handleClose();
  };

  const handleDiscard = () => {
    dispatch(getProjects());
    dispatch(getProjectByID(selectedProject._id));
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box m={2}>
            <Autocomplete
              multiple
              disableCloseOnSelect={true}
              options={projectTeam}
              getOptionLabel={(option) => option.name}
              value={taskTeam}
              onChange={(event, newValue) => {
                setTaskTeam(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label={"Team"} />
              )}
            />
          </Box>

          <Box m={2}>
            <TextField
              label="Description"
              fullWidth
              multiline
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              rows={4}
              variant="outlined"
            />
          </Box>

          <Box m={2}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    label="Deadline"
                    value={deadline}
                    onChange={(date) => {
                      setDeadline(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={difficulty}
                    onChange={(event) => {
                      setDifficulty(event.target.value);
                    }}
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="outlined"
            color="primary"
            autoFocus
          >
            Add
          </Button>
          <Button onClick={handleDiscard} variant="outlined" color="secondary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
