import React, { Component } from "react";

import "../../styles/Dialog.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVolunteer } from "../../actions/membersActions";
import {
  withStyles,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import DepartmentsDropdown from "../utils/DepartmentsDropdown";

const styles = (theme) => ({
  actions: {
    paddingTop: theme.spacing(5),
  },
});

class AddVolunteersDialog extends Component {
  constructor() {
    super();
    this.state = {
      newMember: {
        name: "",
        email: "",
        work_email: "",
        phone: "",
        university: "",
        department: "",
        function: "",
        statut: "",
        start_year: "",
      },
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (event) => {
    const { value, id } = event.target;
    this.setState({
      newMember: {
        ...this.state.newMember,
        [id]: value,
      },
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.addVolunteer(this.state.newMember);
    this.setState({
      newMember: {
        name: "",
        email: "",
        work_email: "",
        phone: "",
        university: "",
        department: "",
        function: "",
        start_year: "",
      },
      errors: {},
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">Add new member</DialogTitle>
          <form onSubmit={this.onSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="name"
                    label="Full name"
                    fullWidth
                    value={this.state.newMember.name}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="email"
                    label="Email"
                    fullWidth
                    value={this.state.newMember.email}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="work_email"
                    label="Work email"
                    fullWidth
                    value={this.state.newMember.work_email}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="phone"
                    label="Phone"
                    fullWidth
                    value={this.state.newMember.phone}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="university"
                    label="University"
                    fullWidth
                    value={this.state.newMember.university}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  {/* <TextField
                    id="department"
                    label="Department"
                    fullWidth
                    value={this.state.newMember.department}
                    onChange={this.onChange}
                    required
                  /> */}
                  <DepartmentsDropdown />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="function"
                    label="Function"
                    fullWidth
                    value={this.state.newMember.function}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="start_year"
                    label="Start year"
                    fullWidth
                    value={this.state.newMember.start_year}
                    onChange={this.onChange}
                    required
                  />
                </Grid>
                {/* <Grid item md={6}>
                  <TextField
                    id="end_year"
                    label="End year"
                    fullWidth
                    value={this.state.newMember.end_year}
                    onChange={this.onChange}
                    required
                  />
                </Grid> */}
              </Grid>
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Button
                onClick={this.props.handleClose}
                variant="outlined"
                color="primary"
              >
                Close
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddVolunteersDialog.propTypes = {
  addVolunteer: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addVolunteer })(
  withStyles(styles)(AddVolunteersDialog)
);
