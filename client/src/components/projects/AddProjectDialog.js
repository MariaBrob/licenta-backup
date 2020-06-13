import React, { Component } from "react";

import "../../styles/Dialog.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../actions/projectsActions";
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

class AddProjectsDialog extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {},
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
      newProject: {
        ...this.state.newProject,
        [id]: value,
      },
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.addProject(this.state.newProject).then((resp) => {
      this.setState({
        newProject: {
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
              <p>ekfbchjsebf</p>
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

AddProjectsDialog.propTypes = {
  addProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addProject })(
  withStyles(styles)(AddProjectsDialog)
);
