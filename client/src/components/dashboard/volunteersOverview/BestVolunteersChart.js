import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import Title from "../Title";

import { useSelector, useDispatch } from "react-redux";
import { getBestVolunteers } from "../../../actions/membersActions";

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

export default function Chart() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const year = new Date("01/01/2000").getFullYear();
  const years = Array.from(new Array(30), (val, index) => index + year);
  const [selectedYear, setSelectedYear] = React.useState("2020");
  const sortedVolunteers = useSelector(
    (state) => state.volunteers.sortedVolunteers
  );
  const departments = useSelector((state) => state.departments.allDepartments);

  var intermediateData = [];
  departments.forEach((element) => {
    if (element.name !== "Board")
      intermediateData.push({ dep: element.name, nr: 0 });
  });

  if (sortedVolunteers.length > 0)
    for (let i = 0; i < 10; i++) {
      intermediateData.forEach((int) => {
        if (sortedVolunteers[i])
          if (sortedVolunteers[i].department === int.dep) {
            int.nr++;
          }
      });
    }

  React.useEffect(() => {
    dispatch(getBestVolunteers(selectedYear));
    // eslint-disable-next-line
  }, [selectedYear]);

  return (
    <React.Fragment>
      <Title>Best 10 volunteers by department</Title>

      <Grid container spacing={2}>
        <Grid item md={5}>
          <Box mt={4} mb={4}>
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
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={intermediateData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dep" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nr" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
