import React, { useEffect } from "react";
import {
  makeStyles,
  Grid,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { updateVolunteer } from "../../../actions/membersActions";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: "10px",
  },
}));

export default function VolunteerDetails() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );
  const departments = useSelector((state) => state.departments.allDepartments);
  const [editableVolunteer, setEditableVolunteer] = React.useState(
    selectedVolunteer
  );
  const year = new Date("01/01/2000").getFullYear();
  const years = Array.from(new Array(30), (val, index) => index + year);

  useEffect(() => {
    setEditableVolunteer(selectedVolunteer);
  }, [selectedVolunteer]);

  return (
    <Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(updateVolunteer(editableVolunteer));
        }}
      >
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
            <FormControl variant="outlined" className={classes.input} fullWidth>
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

        <Grid container spacing={2}>
          <Grid item md={6}>
            <Button variant="outlined" size="small" type="submit">
              Update details
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
