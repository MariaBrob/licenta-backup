import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import Background from "../../img/Untitled-1.png";

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/projects");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/projects");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange}
                  value={this.state.email}
                  error={
                    errors.email !== undefined ||
                    errors.emailnotfound !== undefined
                  }
                />
                {errors.email || errors.emailnotfound ? (
                  <FormHelperText error>
                    {errors.emailnotfound}
                    {errors.email}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  error={
                    errors.password !== undefined ||
                    errors.passwordincorrect !== undefined
                  }
                />
                {errors.password || errors.passwordincorrect ? (
                  <FormHelperText error>
                    {errors.password}
                    {errors.passwordincorrect}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(
  withStyles(styles)(Login)
);
