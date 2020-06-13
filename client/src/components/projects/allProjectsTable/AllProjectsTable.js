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

import AddProjectsDialog from "./AddProjectDialog";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

class ProjectsTable extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 10,
      openAddDialog: false,
    };

    this.columns = [
      { id: "year", label: "Year", minWidth: 170 },
      { id: "name", label: "Name", minWidth: 100 },
      { id: "pm", label: "Project manager", minWidth: 100 },
      { id: "Mentor", label: "Mentor", minWidth: 100 },
      { id: "budget", label: "Budget", minWidth: 100 },
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

  createData(year, name, pm, mentor, budget, id, actions) {
    return {
      year,
      name,
      pm,
      mentor,
      budget,
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
          // onClick={() => this.props.deleteVolunteer(id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );

    return actions;
  };

  populateTable() {
    this.rows = [];
    if (this.props.projects.length !== 0) {
      this.props.projects.forEach((project) => {
        this.rows.push(
          this.createData(
            project.year,
            project.name,
            project.pm,
            project.mentor,
            project.budget,
            project._id,
            this.createActions(project._id)
          )
        );
      });
    }
  }

  render() {
    const { classes } = this.props;
    this.populateTable();

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            {this.props.projects.length !== 0 ? (
              <span>
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
                      {this.rows
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
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
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
                  count={this.rows.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </span>
            ) : (
              <h2>No data to show</h2>
            )}
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
            <AddProjectsDialog
              openDialog={this.state.openAddDialog}
              handleClose={this.handleCloseDialog}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProjectsTable.propTypes = {
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  projects: state.projects.allProjects,
});

export default connect(mapStateToProps, {})(withStyles(styles)(ProjectsTable));
