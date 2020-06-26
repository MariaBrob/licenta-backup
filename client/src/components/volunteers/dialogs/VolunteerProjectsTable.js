import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { useSelector } from "react-redux";
import { returnProjectTasks } from "../../../actions/projectsActions";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "year", label: "Year", minWidth: 10 },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "pm",
    label: "PM",
    minWidth: 150,
  },
];

function createData(_id, id, year, name, pm) {
  return {
    _id,
    id,
    year,
    name,
    pm,
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 480,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const selectedVolunteerProjects = useSelector(
    (state) => state.volunteers.selectedVolunteerProjects
  );
  const [rows, setRows] = React.useState([]);
  var tasksRows = [];

  React.useEffect(() => {
    renderTableCells();
    // eslint-disable-next-line
  }, [selectedVolunteerProjects]);

  const renderTableCells = () => {
    selectedVolunteerProjects.forEach((project, index) => {
      tasksRows.push(
        createData(
          project._id,
          index + 1,
          project.year,
          project.name,
          project.pm
        )
      );

      setRows(tasksRows);
    });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    width: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState(true);

  const expandCell = (project_id) => {
    setOpen(!open);
    returnProjectTasks(project_id).then((resp) => {
      setTasks(resp.data);
    });
  };

  const renderTasks = () => {
    if (tasks.length > 0) {
      return tasks.map((historyRow, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell component="th" scope="row">
            {historyRow.description}
          </TableCell>
          <TableCell>{historyRow.difficulty}</TableCell>
          <TableCell>
            {new Date(historyRow.deadline).toLocaleDateString("en-GB")}
          </TableCell>
        </TableRow>
      ));
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              expandCell(row._id);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.year}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.pm}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Tasks
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">#</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Difficulty</TableCell>
                    <TableCell align="right">Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderTasks()}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
