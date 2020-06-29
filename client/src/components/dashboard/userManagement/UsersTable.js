import React, { useEffect, useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  DialogActions,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
  DialogTitle,
  DialogContent,
  Box,
  Dialog,
  TextField,
} from "@material-ui/core";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUser,
  registerUser,
  deleteUser,
} from "../../../actions/authActions";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "name", label: "User", minWidth: 10 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "department",
    label: "Department",
    minWidth: 10,
  },
  {
    id: "role",
    label: "Role",
    minWidth: 10,
  },
  { id: "eye", label: "Actions", minWidth: 10 },
];

function createData(id, name, email, department, role, _id, eye) {
  return { id, name, email, department, role, _id, eye };
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
  const allUsers = useSelector((state) => state.auth.allUsers);
  const selectedUser = useSelector((state) => state.auth.selectedUser);

  const [openEditUserDialog, setOpenEditUserDialog] = React.useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  var tasksRows = [];

  const [pmDisable, setPmDisable] = React.useState(false);
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    renderTableCells();
    // eslint-disable-next-line
  }, [allUsers]);

  React.useEffect(() => {
    if (user.role === "pm") {
      setPmDisable(true);
    } else {
      setPmDisable(false);
    }
    // eslint-disable-next-line
  }, []);

  const handleClickOpen = (id) => {
    setOpenEditUserDialog(true);
    dispatch(getUser(id));
  };

  const handleClose = () => {
    setOpenEditUserDialog(false);
  };

  const handleOpenAddDialog = (id) => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddUserDialog(false);
  };

  const renderTableCells = () => {
    allUsers.forEach((user, index) => {
      tasksRows.push(
        createData(
          index + 1,
          user.name,
          user.email,
          user.department,
          user.role,
          user._id,
          <span>
            <IconButton
              disabled={pmDisable}
              onClick={() => {
                handleClickOpen(user._id);
              }}
            >
              <RemoveRedEye />
            </IconButton>
            <IconButton
              disabled={pmDisable}
              onClick={() => {
                handleDelete(user);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        )
      );

      setRows(tasksRows);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (user) => {
    dispatch(deleteUser(user));
  };

  const renderEditDialog = () => {
    if (selectedUser !== null) {
      return (
        <EditUserDialog open={openEditUserDialog} handleClose={handleClose} />
      );
    } else return null;
  };

  return (
    <span>
      <Button
        disabled={pmDisable}
        onClick={() => handleOpenAddDialog()}
        className={classes.addButton}
      >
        <AddIcon color="secondary" />
        Add user
      </Button>

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

        <AddUserDialog
          open={openAddUserDialog}
          handleClose={handleCloseAddDialog}
        />
        {renderEditDialog()}
      </Paper>
    </span>
  );
}

function EditUserDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const [editableUser, setEditableUser] = useState(selectedUser);
  const projects = useSelector((state) => state.projects.allProjects);

  const renderProjectsDropdown = () => {
    if (projects.length > 0) {
      return projects.map((project, index) => {
        return (
          <MenuItem key={index} value={project._id}>
            {`${project.name} ${project.year}`}
          </MenuItem>
        );
      });
    }
  };

  useEffect(() => {
    setEditableUser(selectedUser);
  }, [selectedUser]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(updateUser(editableUser));
            props.handleClose();
          }}
        >
          <DialogTitle>Edit user</DialogTitle>
          <DialogContent>
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <TextField
                    label="Full name"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableUser.name}
                    onChange={(event) =>
                      setEditableUser({
                        ...editableUser,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={editableUser.email}
                    onChange={(event) =>
                      setEditableUser({
                        ...editableUser,
                        email: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <FormControl
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={editableUser.department}
                      onChange={(event) => {
                        setEditableUser({
                          ...editableUser,
                          department: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"Board"}>Board</MenuItem>
                      <MenuItem value={"HR"}>HR</MenuItem>
                      <MenuItem value={"PR"}>PR</MenuItem>
                      <MenuItem value={"FR"}>FR</MenuItem>
                      <MenuItem value={"Visual"}>Visual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <FormControl required fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      fullWidth
                      value={editableUser.role}
                      onChange={(event) => {
                        setEditableUser({
                          ...editableUser,
                          role: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"hr"}>HR</MenuItem>
                      <MenuItem value={"board"}>Board</MenuItem>
                      <MenuItem value={"pm"}>Project manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel>Project</InputLabel>
                    <Select
                      value={editableUser.project_id}
                      onChange={(event) => {
                        setEditableUser({
                          ...editableUser,
                          project_id: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value="" disabled>
                        No project
                      </MenuItem>
                      {renderProjectsDropdown()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" variant="outlined" autoFocus>
              Save
            </Button>
            <Button
              onClick={props.handleClose}
              color="secondary"
              variant="outlined"
            >
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

function AddUserDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addUser, setAddUser] = useState({
    name: "",
    email: "",
    role: "hr",
    department: "HR",
    project_id: "",
  });
  const projects = useSelector((state) => state.projects.allProjects);

  const renderProjectsDropdown = () => {
    if (projects.length > 0) {
      return projects.map((project, index) => {
        return (
          <MenuItem key={index} value={project._id}>
            {`${project.name} ${project.year}`}
          </MenuItem>
        );
      });
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(registerUser(addUser));
            setAddUser({ name: "", email: "", role: "hr", department: "HR" });
            props.handleClose();
          }}
        >
          <DialogTitle>Add user</DialogTitle>
          <DialogContent>
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <TextField
                    label="Full name"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={addUser.name}
                    onChange={(event) =>
                      setAddUser({
                        ...addUser,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    className={classes.input}
                    fullWidth
                    value={addUser.email}
                    onChange={(event) =>
                      setAddUser({
                        ...addUser,
                        email: event.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <FormControl
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={addUser.department}
                      onChange={(event) => {
                        setAddUser({
                          ...addUser,
                          department: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"Board"}>Board</MenuItem>
                      <MenuItem value={"HR"}>HR</MenuItem>
                      <MenuItem value={"PR"}>PR</MenuItem>
                      <MenuItem value={"FR"}>FR</MenuItem>
                      <MenuItem value={"Visual"}>Visual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <FormControl
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={addUser.role}
                      onChange={(event) => {
                        setAddUser({
                          ...addUser,
                          role: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"hr"}>HR</MenuItem>
                      <MenuItem value={"board"}>Board</MenuItem>
                      <MenuItem value={"pm"}>Project manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel>Project</InputLabel>
                    <Select
                      value={addUser.project_id}
                      onChange={(event) => {
                        setAddUser({
                          ...addUser,
                          project_id: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value="" disabled>
                        No project
                      </MenuItem>
                      {renderProjectsDropdown()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" variant="outlined" autoFocus>
              Add
            </Button>
            <Button
              onClick={props.handleClose}
              color="secondary"
              variant="outlined"
            >
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
