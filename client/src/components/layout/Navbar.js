import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

import {
  withStyles,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

import "../../App.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  projects: {
    marginLeft: "15px",
  },
  logoutButton: {
    textTransform: "none",
    color: "#fff",
    paddingRight: "0px",
  },
  people: {
    flexGrow: 4,
    marginLeft: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
});

class Navigation extends Component {
  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;

    return (
      <header>
        <div className={classes.root}>
          <Toolbar className="bcolor" variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">ASFILS</Typography>

            <Typography className={classes.projects}>
              <Link to="/projects" className={classes.link}>
                Projects
              </Link>
            </Typography>

            <Typography className={classes.people}>
              <Link to="/volunteers" className={classes.link}>
                Volunteers
              </Link>
            </Typography>

            <Typography>{this.props.auth.user.name}</Typography>
            <Button
              className={classes.logoutButton}
              onClick={this.onLogoutClick}
            >
              <ExitToAppRoundedIcon />
            </Button>
          </Toolbar>
        </div>
      </header>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Navigation)
);
