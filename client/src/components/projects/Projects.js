import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, AppBar, Box, Container } from "@material-ui/core";

import { getProjects } from "../../actions/projectsActions";
import { getDepartments } from "../../actions/departmentsActions";
import { getAllVolunteers } from "../../actions/membersActions";

import Navbar from "../layout/Navbar";
import ProjectsTable from "./ProjectsTable";

const styles = (theme) => ({
  root: {
    width: "90%",
  },
});

class Projects extends Component {
  constructor(props) {
    super(props);

    this.props.getProjects();
    this.props.getDepartments();
    this.props.getAllVolunteers();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar>
          <Navbar />
        </AppBar>
        <Container maxWidth={false} className={classes.root} component="div">
          <Box align="center" fontSize="30px" my={10}>
            Projects
          </Box>
          <Box my={2}>
            <ProjectsTable />
          </Box>
        </Container>
      </div>
    );
  }
}

Projects.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getProjects,
  getDepartments,
  getAllVolunteers,
})(withStyles(styles)(withRouter(Projects)));
