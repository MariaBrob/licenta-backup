import React from "react";
import {
  makeStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Button,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import ProjectDialog from "./ProjectDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProject,
  getProjectByID,
  addProject,
  getProjectTasks,
} from "../../actions/projectsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    // overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: "rgb(4, 57, 108)",
    color: "white",
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const createData = (year, name, pm, mentor, budget, id, isEditMode, type) => ({
  year,
  name,
  pm,
  mentor,
  budget,
  id,
  isEditMode,
  type,
});

const CustomTableCell = ({ row, name, onChange, type }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  const volunteers = useSelector((state) => state.volunteers.allVolunteers);

  if (type === "input") {
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            fullWidth
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  } else if (type === "dropdown") {
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Select
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className={classes.input}
          >
            <MenuItem key={100} value={""}>
              <em>NONE</em>
            </MenuItem>
            {volunteers.map((volunteer, index) => {
              return (
                <MenuItem
                  label="Select entity"
                  value={volunteer.name}
                  key={index}
                  name={volunteer.name}
                >
                  {volunteer.name}
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          row[name]
        )}
      </TableCell>
    );
  }
};

function ProjectsTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.allProjects);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [rows, setRows] = React.useState([]);
  const [previous, setPrevious] = React.useState({});
  const [openDialog, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  var projectRows = [];
  projects.forEach((project) => {
    projectRows.push(
      createData(
        project.year,
        project.name,
        project.pm,
        project.mentor,
        project.budget,
        project._id,
        false
      )
    );
  });

  if (projectRows.length !== 0 && rows.length === 0) {
    setRows(projectRows);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (id) => {
    setOpen(true);
    dispatch(getProjectByID(id));
    dispatch(getProjectTasks(id));
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onAdd = () => {
    projectRows.push(createData("", "", "", "", "", "insert", true, "insert"));
    setRows(projectRows);
  };

  const onUpdate = (id, type) => {
    rows.forEach((row) => {
      if (row.id === id) {
        if (type !== "insert") {
          return dispatch(updateProject(row));
        } else {
          dispatch(addProject(row));
        }
      } else return false;
    });
    onToggleEditMode(id);
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }

    const { id } = row;
    const value = e.target.value;
    const name = e.target.name;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id, type) => {
    if (type === "insert") {
      rows.pop();
      setRows(rows);

      setPrevious((state) => {
        delete state["insert"];
        return state;
      });
    } else {
      const newRows = rows.map((row) => {
        if (row.id === id) {
          return previous[id] ? previous[id] : row;
        }
        return row;
      });
      setRows(newRows);
      setPrevious((state) => {
        delete state[id];
        return state;
      });
    }
    onToggleEditMode(id);
  };

  const renderProjectDialog = () => {
    if (selectedProject !== null) {
      return (
        <ProjectDialog open={openDialog} handleClose={handleCloseDialog} />
      );
    } else {
      return null;
    }
  };

  return (
    <span className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={2}>
          <Button variant="outlined" onClick={onAdd}>
            Add project
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={12}>
          <Paper>
            <TableContainer className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head} align="left">
                      Year
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Name
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      PM
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Mentor
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Budget
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <CustomTableCell
                          {...{ row, name: "year", onChange, type: "input" }}
                        />
                        <CustomTableCell
                          {...{ row, name: "name", onChange, type: "input" }}
                        />
                        <CustomTableCell
                          {...{ row, name: "pm", onChange, type: "dropdown" }}
                        />
                        <CustomTableCell
                          {...{
                            row,
                            name: "mentor",
                            onChange,
                            type: "dropdown",
                          }}
                        />
                        <CustomTableCell
                          {...{ row, name: "budget", onChange, type: "input" }}
                        />
                        <TableCell className={classes.selectTableCell}>
                          {row.isEditMode ? (
                            <>
                              <IconButton
                                onClick={() => onUpdate(row.id, row.type)}
                              >
                                <DoneIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => onRevert(row.id, row.type)}
                              >
                                <RevertIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                onClick={() => onToggleEditMode(row.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenDialog(row.id)}
                              >
                                <RemoveRedEye />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      {renderProjectDialog()}
      {/* <ProjectDialog open={openDialog} handleClose={handleCloseDialog} /> */}
    </span>
  );
}

export default ProjectsTable;
