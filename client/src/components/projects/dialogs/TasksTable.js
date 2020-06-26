import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import { useDispatch, useSelector } from "react-redux";
import {
  getProjectTaskByID,
  getProjectTasks,
} from "../../../actions/projectsActions";
import EditTaskDialog from "./EditTaskDialog";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "volunteers", label: "Volunteers", minWidth: 10 },
  {
    id: "task",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 10,
  },
  {
    id: "difficulty",
    label: "Difficulty",
    minWidth: 10,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 10,
  },
  { id: "eye", label: "Actions", minWidth: 10 },
];

function createData(id, volunteers, task, deadline, difficulty, status, eye) {
  return { id, volunteers, task, deadline, difficulty, status, eye };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 370,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const selectedProjectTasks = useSelector(
    (state) => state.projects.selectedProjectTasks
  );
  const selectedTask = useSelector(
    (state) => state.projects.selectedProjectTaskID
  );
  const [openEditTaskDialog, setOpenEditTaskDialog] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  var tasksRows = [];

  React.useEffect(() => {
    renderTableCells();
    // eslint-disable-next-line
  }, [selectedProjectTasks]);

  const renderTableCells = () => {
    selectedProjectTasks.forEach((task, index) => {
      var names = "";
      task.team.forEach((element) => {
        names += element.name + "; ";
      });

      tasksRows.push(
        createData(
          index + 1,
          names,
          task.description,
          new Date(task.deadline).toLocaleDateString("en-GB"),
          task.difficulty,
          task.status,
          <IconButton
            onClick={() => {
              handleOpenEditTaskDialog(task._id);
            }}
          >
            <RemoveRedEye />
          </IconButton>
        )
      );

      setRows(tasksRows);
    });
  };

  const handleOpenEditTaskDialog = (id) => {
    setOpenEditTaskDialog(true);
    dispatch(getProjectTaskByID(id));
  };

  const handleCloseEditTaskDialog = () => {
    dispatch(getProjectTasks(selectedProject._id));
    setOpenEditTaskDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderEditTaskDialog = () => {
    if (selectedTask !== null) {
      return (
        <EditTaskDialog
          open={openEditTaskDialog}
          handleClose={handleCloseEditTaskDialog}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {renderEditTaskDialog()}
    </Paper>
  );
}
