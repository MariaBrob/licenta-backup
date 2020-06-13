import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../../actions/projectsActions";

import { MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class AddProjectsModal extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            budget: "",
            errors: {},
            modal: false
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();

        const newProject = {
            name: this.state.name,
            description: this.state.description,
            budget: this.state.budget,
        };
        this.props.addProject(newProject);

        this.setState({
            name: "",
            description: "",
            budget: "",
            errors: {},
        });
        this.toggle();
        // window.location.href = "./projects";
    };


    render() {
        return (
            <div>
                <MDBBtn className="light-blue darken-4" onClick={this.toggle}>Add project</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>Add member</MDBModalHeader>
                    <MDBModalBody>
                        <MDBRow className="d-flex">
                            <MDBCol>
                                <form>
                                    <MDBRow>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="Project name"
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="name"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="Project name"
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                id="description"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="Budget"
                                                onChange={this.onChange}
                                                value={this.state.budget}
                                                id="budget"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="light-blue" className="light-blue darken-2" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="light-blue" className="light-blue darken-4" type="submit" onClick={this.onSubmit}>Sumbit</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

            </div>
        )
    }
}


AddProjectsModal.propTypes = {
    addProject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { addProject }
)(AddProjectsModal);