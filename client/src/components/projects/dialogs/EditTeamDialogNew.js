import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useSelector, useDispatch } from "react-redux";
import {
  getProjects,
  updateTeam,
  getProjectByID,
} from "../../../actions/projectsActions";

export default function AlertDialog(props) {
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const volunteers = useSelector((state) => state.volunteers.allVolunteers);
  const departments = useSelector((state) => state.departments.allDepartments);
  const [team, setTeam] = React.useState(selectedProject.team[0]);

  const handleSubmit = (team) => {
    dispatch(updateTeam(selectedProject._id, team));
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
        <DialogTitle>Edit Project Team</DialogTitle>
        <DialogContent>
          {departments.map((department, index) => {
            var volunteersByDepartment = [];
            volunteers.map((volunteer) => {
              if (volunteer.department === department.name) {
                volunteersByDepartment.push(volunteer);
              }

              return true;
            });

            return (
              <Box m={2} key={index}>
                <Autocomplete
                  multiple
                  options={volunteersByDepartment}
                  getOptionLabel={(option) => option.name}
                  value={team[department.name]}
                  onChange={(event, newValue) => {
                    console.log(volunteersByDepartment);
                    console.log(newValue);
                    setTeam({ ...team, [department.name]: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={department.name}
                    />
                  )}
                />
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleSubmit(team)}
            variant="outlined"
            color="primary"
            autoFocus
          >
            Save
          </Button>
          <Button onClick={handleDiscard} variant="outlined" color="secondary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
