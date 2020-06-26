import React from "react";
import {
  makeStyles,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { addVolunteer } from "../../../actions/membersActions";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: "10px",
  },
}));

export default function AddVolunteerDialog(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.allDepartments);
  const [editableVolunteer, setEditableVolunteer] = React.useState({
    name: "",
    phone: "",
    email: "",
    work_email: "",
    university: "",
    department: "",
    start_year: "",
    end_year: "present",
  });
  const year = new Date("01/01/2000").getFullYear();
  const years = Array.from(new Array(30), (val, index) => index + year);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>Add Volunteer</DialogTitle>

        <form onSubmit={() => dispatch(addVolunteer(editableVolunteer))}>
          <DialogContent>
            <Box>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Typography variant="caption" color="secondary">
                    * marks mandatory field
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    label="Full name"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableVolunteer.name}
                    onChange={(event) =>
                      setEditableVolunteer({
                        ...editableVolunteer,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableVolunteer.phone}
                    onChange={(event) =>
                      setEditableVolunteer({
                        ...editableVolunteer,
                        phone: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    label="Personal email"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableVolunteer.email}
                    onChange={(event) =>
                      setEditableVolunteer({
                        ...editableVolunteer,
                        email: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Organisation email"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableVolunteer.work_email}
                    onChange={(event) =>
                      setEditableVolunteer({
                        ...editableVolunteer,
                        work_email: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                  >
                    <InputLabel>University</InputLabel>
                    <Select
                      value={editableVolunteer.university}
                      onChange={(event) =>
                        setEditableVolunteer({
                          ...editableVolunteer,
                          university: event.target.value,
                        })
                      }
                      label="University"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="UPB">
                        Politehnica University of Bucharest
                      </MenuItem>
                      <MenuItem value="UB">University of Bucharest</MenuItem>
                      <MenuItem value="ASE">
                        Bucharest Academy of Economic Studies
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    required
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={editableVolunteer.department}
                      onChange={(event) =>
                        setEditableVolunteer({
                          ...editableVolunteer,
                          department: event.target.value,
                        })
                      }
                      label="Department"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {departments.map((dep, index) => {
                        return (
                          <MenuItem key={index} value={dep.name}>
                            {dep.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    required
                  >
                    <InputLabel>Strated in</InputLabel>
                    <Select
                      value={editableVolunteer.start_year}
                      onChange={(event) =>
                        setEditableVolunteer({
                          ...editableVolunteer,
                          start_year: event.target.value,
                        })
                      }
                      label="Started in"
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
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    required
                  >
                    <InputLabel>Finished in</InputLabel>
                    <Select
                      value={editableVolunteer.end_year}
                      onChange={(event) =>
                        setEditableVolunteer({
                          ...editableVolunteer,
                          end_year: event.target.value,
                        })
                      }
                      label="Finished in"
                    >
                      <MenuItem value="present">
                        <em>Present</em>
                      </MenuItem>
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {}}
              type="submit"
              variant="outlined"
              color="primary"
              autoFocus
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={props.handleClose}
            >
              Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
