import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  withStyles,
  Grid,
  Button,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
} from "@material-ui/core";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteVolunteer } from "../../actions/membersActions";
import AddVolunteerDialog from "../volunteers/AddVolunteerDialog";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

class VolunteersTable extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 10,
      openAddDialog: false,
    };

    this.columns = [
      { id: "name", label: "Name", minWidth: 170 },
      { id: "email", label: "Email", minWidth: 100 },
      { id: "work_email", label: "Work email", minWidth: 100 },
      { id: "phone", label: "Phone", minWidth: 100 },
      { id: "department", label: "Department", minWidth: 50 },
      { id: "func", label: "Function", minWidth: 50 },
      { id: "start_year", label: "Start year", minWidth: 50 },
      { id: "end_year", label: "End year", minWidth: 50 },
      { id: "actions", label: "Actions", minWidth: 50 },
    ];
  }

  handleOpenDialog = () => {
    this.setState({
      openAddDialog: true,
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openAddDialog: false,
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,
    });
  };

  createData(
    name,
    email,
    work_email,
    phone,
    department,
    func,
    start_year,
    end_year,
    id,
    actions
  ) {
    return {
      name,
      email,
      work_email,
      phone,
      department,
      func,
      start_year,
      end_year,
      id,
      actions,
    };
  }

  createActions = (id) => {
    var actions = (
      <div>
        <IconButton
          style={{
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <RemoveRedEye />
        </IconButton>
        <IconButton
          style={{
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => this.props.deleteVolunteer(id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );

    return actions;
  };

  render() {
    const { classes } = this.props;

    if (this.props.volunteers.length !== 0) {
      var rows = [];

      this.props.volunteers.forEach((volunteer) => {
        if (this.props.department.name === volunteer.department) {
          rows.push(
            this.createData(
              volunteer.name,
              volunteer.email,
              volunteer.work_email,
              volunteer.phone,
              volunteer.department,
              volunteer.function,
              volunteer.start_year,
              volunteer.end_year,
              volunteer._id,
              this.createActions(volunteer._id)
            )
          );
        }
      });

      var table = (
        <div>
          <TableContainer className={classes.container}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {this.columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {this.columns.map((column) => {
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      );
    } else {
      table = <h2>No data to show</h2>;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            {table}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Button
              variant="contained"
              onClick={this.handleOpenDialog}
              color="primary"
            >
              Add volunteer
            </Button>
            <AddVolunteerDialog
              openDialog={this.state.openAddDialog}
              handleClose={this.handleCloseDialog}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

VolunteersTable.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  volunteers: state.volunteers.allVolunteers,
});

export default connect(mapStateToProps, { deleteVolunteer })(
  withStyles(styles)(VolunteersTable)
);
