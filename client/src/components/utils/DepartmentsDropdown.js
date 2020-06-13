import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const styles = (theme) => ({
  formControl: {
    minWidth: 120,
  },
});

class DepartmentsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      department: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      department: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel>Department</InputLabel>
        <Select value={this.state.department} onChange={this.handleChange}>
          {this.props.allDepartments.map((department, index) => {
            return (
              <MenuItem
                label="Select entity"
                value={department.name}
                key={index}
                name={department.name}
              >
                {department.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

DepartmentsDropdown.propTypes = {
  allDepartments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allDepartments: state.departments.allDepartments,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(DepartmentsDropdown))
);
