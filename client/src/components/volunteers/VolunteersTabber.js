import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {
  withStyles,
  Paper,
  Grid,
  Box,
  Tabs,
  Tab,
  AppBar,
  Typography,
} from "@material-ui/core";

import VolunteersTable from "../../components/volunteers/VolunteersTable";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

class VolunteersTabber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  renderTabs() {
    return this.props.departments.map((dep, index) => {
      return <Tab key={index} label={dep.name} {...a11yProps(index)} />;
    });
  }

  renderViews() {
    return this.props.departments.map((dep, index) => {
      return (
        <TabPanel key={index} value={this.state.value} index={index}>
          <VolunteersTable department={dep} />
        </TabPanel>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box align="center" fontSize="30px" m={1}>
              Volunteers
            </Box>
          </Grid>
          <Grid item md={12}>
            <Paper square>
              <Box my={4} className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    {this.renderTabs()}
                  </Tabs>
                </AppBar>
                <SwipeableViews index={this.state.value}>
                  {this.renderViews()}
                </SwipeableViews>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

VolunteersTabber.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  departments: state.departments.allDepartments,
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(VolunteersTabber));
