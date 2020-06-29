import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Paper,
  CardContent,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Grid,
  InputLabel,
  Box,
  IconButton,
} from "@material-ui/core";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import { useSelector, useDispatch } from "react-redux";
import {
  getBestVolunteersYear,
  getVolunteerByID,
  getVolunteerProjects,
  getComments,
} from "../../../actions/membersActions";

import VolunteerDialog from "../../volunteers/VolunteerDialog";
import Title from "../Title";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const year = new Date("01/01/2000").getFullYear();
  const years = Array.from(new Array(30), (val, index) => index + year);
  const [selectedYear, setSelectedYear] = React.useState("2020");
  const [openDialog, setOpen] = React.useState(false);
  const sortedVolunteers = useSelector(
    (state) => state.volunteers.sortedVolunteersYear
  );
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );

  React.useEffect(() => {
    dispatch(getBestVolunteersYear(selectedYear));
    renderSortedVolunteers();
    // eslint-disable-next-line
  }, [selectedYear]);

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

  const renderSortedVolunteers = () => {
    return sortedVolunteers.map((volunteer, index) => {
      if (index < 10) {
        return (
          <Paper key={index} elevation={3}>
            <Box m={2}>
              <Typography variant="body2" component="p">
                {volunteer.name} &nbsp;
                <IconButton onClick={() => handleOpenDialog(volunteer._id)}>
                  <RemoveRedEye />
                </IconButton>
              </Typography>
            </Box>
          </Paper>
        );
      } else return null;
    });
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Title>Best 10 volunteers</Title>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={5}>
            <Box mt={4}>
              <FormControl
                variant="outlined"
                className={classes.input}
                fullWidth
                required
              >
                <InputLabel>Select year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(event.target.value)}
                  label="Select year"
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
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            {renderSortedVolunteers()}
          </Grid>
        </Grid>
      </CardContent>
      {renderVolunteerDialog()}
    </Card>
  );
}
