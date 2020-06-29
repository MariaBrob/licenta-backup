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
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import VolunteersTable from "./VolunteersTable";
import AddVolunteerDialog from "./dialogs/AddVolunteerDialog";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

const ButtonInTabs = ({ className, onClick, children, user_role }) => {
  return (
    <Box display="flex" flexDirection="row-reverse">
      <Button
        className={className}
        disabled={user_role === "pm"}
        onClick={onClick}
        children={children}
      />
    </Box>
  );
};

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
      openAddDialog: false,
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

  handleOpenAddDialog = () => {
    console.log("hbsdjhvb");
    this.setState({
      openAddDialog: true,
    });
  };

  handleCloseAddDialog = () => {
    this.setState({
      openAddDialog: false,
    });
  };

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
                    <ButtonInTabs
                      onClick={() => this.handleOpenAddDialog()}
                      className={classes.addButton}
                      user_role={this.props.user.role}
                    >
                      <AddIcon color="secondary" />
                      Add volunteer
                    </ButtonInTabs>
                  </Tabs>
                </AppBar>
                <SwipeableViews index={this.state.value}>
                  {this.renderViews()}
                </SwipeableViews>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <AddVolunteerDialog
          open={this.state.openAddDialog}
          handleClose={this.handleCloseAddDialog}
        />
      </div>
    );
  }
}

VolunteersTabber.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  departments: state.departments.allDepartments,
  user: state.auth.user,
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(VolunteersTabber));
