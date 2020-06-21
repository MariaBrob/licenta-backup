import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBox } from "mdbreact";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/projects");
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <MDBContainer className="login-form">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="6">
            <form onSubmit={this.onSubmit}>
              <p className="h4 text-center mb-4">Register</p>
              <label className="grey-text">Name</label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                type="text"
                className={
                  errors.name ? "form-control is-invalid" : "form-control"
                }
              />
              <div className="invalid-feedback">{errors.name}</div>
              <br />

              <label className="grey-text">Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
                className={
                  errors.email ? "form-control is-invalid" : "form-control"
                }
              />
              <div className="invalid-feedback">{errors.email}</div>
              <br />

              <label className="grey-text">Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
                className={
                  errors.password ? "form-control is-invalid" : "form-control"
                }
              />
              <div className="invalid-feedback">{errors.password}</div>
              <br />

              <label className="grey-text">Confirm password</label>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                id="password2"
                type="password"
                className={
                  errors.password2 ? "form-control is-invalid" : "form-control"
                }
              />
              <div className="invalid-feedback">{errors.password2}</div>
              <div className="text-center mt-4">
                <MDBBtn color="unique" type="submit">
                  Register
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBBox tag="p" className="d-flex justify-content-center mt-5">
              Arleady have an account?{" "}
              <Link to="/login" className="pl-2">
                {" "}
                Logn in
              </Link>
            </MDBBox>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
