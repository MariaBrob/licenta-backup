// import React from "react";
// import {
//   makeStyles,
//   Button,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   Box,
//   FormControl,
// } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   getProjects,
//   getProjectByID,
//   getProjectTasks,
// } from "../../../actions/projectsActions";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// export default function EditTaskDialog(props) {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const selectedProject = useSelector(
//     (state) => state.projects.selectedProject
//   );
//   const selectedTask = useSelector(
//     (state) => state.projects.selectedProjectTaskID
//   );
//   const departments = useSelector((state) => state.departments.allDepartments);

//   const [deadline, setDeadline] = React.useState(new Date());
//   const [difficulty, setDifficulty] = React.useState("Low");

//   if (selectedTask !== undefined) {
//     const handleSubmit = () => {
//       // var allVolunteers = [];
//       // departments.map((department, index) => {
//       //   taskTeam[department.name].map((element) => {
//       //     allVolunteers.push(element._id);
//       //   });
//       // });
//       // dispatch(
//       //   addTask(
//       //     selectedProject._id,
//       //     taskTeam,
//       //     allVolunteers,
//       //     description,
//       //     deadline,
//       //     difficulty
//       //   )
//       // );
//     };

//     const handleDiscard = () => {
//       dispatch(getProjects());
//       dispatch(getProjectByID(selectedProject._id));
//       props.handleClose();
//     };

//     return (
//       <div>
//         <Dialog open={props.open} onClose={props.handleClose}>
//           <DialogTitle>Add Task</DialogTitle>
//           <DialogContent>
//             {departments.map((department, index) => {
//               return (
//                 <Box m={2} key={index}>
//                   <Autocomplete
//                     multiple
//                     options={selectedProject.team[0][department.name]}
//                     getOptionLabel={(option) => option.name}
//                     value={selectedTask.team[department.name]}
//                     onChange={(event, newValue) => {
//                       console.log(newValue);
//                       console.log(selectedTask.team["Board"]);
//                       selectedTask.team[department.name] = newValue;
//                     }}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         variant="standard"
//                         label={department.name}
//                       />
//                     )}
//                   />
//                 </Box>
//               );
//             })}

//             <Box m={2}>
//               <TextField
//                 label="Description"
//                 fullWidth
//                 multiline
//                 value={selectedTask.description}
//                 onChange={(event) => {
//                   selectedTask.description = event.target.value;
//                   // setDescription(event.target.value);
//                 }}
//                 rows={4}
//                 variant="outlined"
//               />
//             </Box>

//             <Box m={2}>
//               <Grid container spacing={2}>
//                 <Grid item md={6}>
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardDatePicker
//                       disableToolbar
//                       variant="inline"
//                       format="MM/dd/yyyy"
//                       label="Deadline"
//                       value={deadline}
//                       onChange={(date) => {
//                         setDeadline(date);
//                       }}
//                     />
//                   </MuiPickersUtilsProvider>
//                 </Grid>
//                 <Grid item md={6}>
//                   <FormControl className={classes.formControl}>
//                     <InputLabel>Difficulty</InputLabel>
//                     <Select
//                       value={difficulty}
//                       onChange={(event) => {
//                         setDifficulty(event.target.value);
//                       }}
//                     >
//                       <MenuItem value={"Low"}>Low</MenuItem>
//                       <MenuItem value={"Medium"}>Medium</MenuItem>
//                       <MenuItem value={"High"}>High</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </Box>

//             <Box m={2}>
//               <Button
//                 onClick={handleDiscard}
//                 variant="outlined"
//                 color="secondary"
//               >
//                 Close task
//               </Button>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => {
//                 dispatch(getProjectTasks(selectedProject._id));
//                 handleSubmit();
//               }}
//               variant="outlined"
//               color="primary"
//               autoFocus
//             >
//               Add
//             </Button>
//             <Button
//               onClick={handleDiscard}
//               variant="outlined"
//               color="secondary"
//             >
//               Discard
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   } else {
//     return <span></span>;
//   }
// }

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
  updateTask,
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
  const selectedTask = useSelector(
    (state) => state.projects.selectedProjectTaskID
  );

  const [projectTeam, setProjectTeam] = React.useState([]);
  const [task, setTask] = React.useState(selectedTask);

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
    console.log(selectedTask);
  }, [selectedTask]);

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

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Task</DialogTitle>
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
                    value={task.deadline}
                    onChange={(date) => {
                      setTask({ ...task, deadline: date });
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={task.difficulty}
                    onChange={(event) => {
                      setTask({ ...task, difficulty: event.target.value });
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
