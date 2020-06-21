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

import VolunteerDialog from "./VolunteerDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  getVolunteerByID,
  addVolunteer,
  updateVolunteer,
  getVolunteerProjects,
  getComments,
} from "../../actions/membersActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    // overflowX: "auto",
  },
  table: {
    minWidth: "100%",
  },
  head: {
    backgroundColor: "rgb(4, 57, 108)",
    color: "white",
  },
  selectTableCell: {
    // width: 60,
  },
  tableCell: {
    // width: 130,
    height: 40,
  },
  input: {
    // width: 130,
    height: 40,
  },
}));

const createData = (
  name,
  email,
  work_email,
  phone,
  department,
  start_year,
  end_year,
  id,
  isEditMode,
  type
) => ({
  name,
  email,
  work_email,
  phone,
  department,
  start_year,
  end_year,
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

function ProjectsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const volunteers = useSelector((state) => state.volunteers.allVolunteers);
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );
  const [rows, setRows] = React.useState([]);
  const [previous, setPrevious] = React.useState({});
  const [openDialog, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  var depRows = [];
  volunteers.forEach((volunteer) => {
    if (props.department.name === volunteer.department) {
      depRows.push(
        createData(
          volunteer.name,
          volunteer.email,
          volunteer.work_email,
          volunteer.phone,
          volunteer.department,
          volunteer.start_year,
          volunteer.end_year,
          volunteer._id,
          false
        )
      );
    }
  });

  if (depRows.length !== 0 && rows.length === 0) {
    setRows(depRows);
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
    dispatch(getVolunteerProjects(id));
    dispatch(getVolunteerByID(id));
    dispatch(getComments(id));
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
    depRows.push(
      createData("", "", "", "", "", "", "", "", "insert", true, "insert")
    );
    setRows(depRows);
  };

  const onUpdate = (id, type) => {
    rows.forEach((row) => {
      if (row.id === id) {
        if (type !== "insert") {
          return dispatch(updateVolunteer(row));
        } else {
          dispatch(addVolunteer(row));
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

  const renderVolunteerDialog = () => {
    if (selectedVolunteer !== null) {
      return (
        <VolunteerDialog open={openDialog} handleClose={handleCloseDialog} />
      );
    } else {
      return null;
    }
  };

  return (
    <span className={classes.root}>
      {/* <Grid
        container
        spacing={3}
        alignItems="flex-end"
        alignContent="flex-end"
        justify="flex-end"
        direction="row"
      >
        <Grid item md={2} align="right">
          <Button variant="outlined" onClick={onAdd}>
            Add volunteer
          </Button>
        </Grid>
      </Grid> */}

      <Grid container spacing={2}>
        <Grid item md={12}>
          <Paper>
            <TableContainer className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head} align="left">
                      Name
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Email
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Work email
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Phone
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Department
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      Start year
                    </TableCell>
                    <TableCell className={classes.head} align="left">
                      End year
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
                          {...{ row, name: "name", onChange, type: "input" }}
                        />
                        <CustomTableCell
                          {...{ row, name: "email", onChange, type: "input" }}
                        />
                        <CustomTableCell
                          {...{
                            row,
                            name: "work_email",
                            onChange,
                            type: "input",
                          }}
                        />
                        <CustomTableCell
                          {...{ row, name: "phone", onChange, type: "input" }}
                        />
                        <CustomTableCell
                          {...{
                            row,
                            name: "department",
                            onChange,
                            type: "dropdown",
                          }}
                        />
                        <CustomTableCell
                          {...{
                            row,
                            name: "start_year",
                            onChange,
                            type: "input",
                          }}
                        />
                        <CustomTableCell
                          {...{
                            row,
                            name: "end_year",
                            onChange,
                            type: "input",
                          }}
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

      {renderVolunteerDialog()}
    </span>
  );
}

export default ProjectsTable;
