import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, AppBar, Container, Box } from "@material-ui/core";

import { getDepartments } from "../../actions/departmentsActions";
import { getAllVolunteers } from "../../actions/membersActions";
import Navbar from "../layout/Navbar";
import VolunteersTabs from "../volunteers/VolunteersTabber";

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    width: "90%",
  },
  root1: {
    height: "30% !important",
  },
});

class Volunteers extends Component {
  constructor(props) {
    super(props);

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
        {/* <div className={classes.toolbar} /> */}
        <Container maxWidth={false} className={classes.root} component="div">
          <Box my={10}>
            <VolunteersTabs className={classes.root1} />
          </Box>
        </Container>
      </div>
    );
  }
}

Volunteers.propTypes = {
  getDepartments: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getDepartments,
  getAllVolunteers,
})(withStyles(styles)(withRouter(Volunteers)));
