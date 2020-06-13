import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProjectsDetails } from "../../../actions/projectsActions";

import { MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class AddProjectsDetailsModal extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            year: "",
            PM: "",
            visual_no: "",
            pr_no: "",
            hr_no: "",
            fr_no: "",
            visual_team: [],
            pr_team: [],
            fr_team: [],
            hr_team: [],
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

        const newProjectDetails = {
            name: this.state.name,
            year: this.state.year,
            PM: this.state.pm,
            visual_no: this.state.visual_no,
            pr_no: this.state.pr_no,
            hr_no: this.state.hr_no,
            fr_no: this.state.fr_no,
            visual_team: this.state.visual_team,
            pr_team: this.state.pr_team,
            fr_team: this.state.fr_team,
            hr_team: this.state.hr_team,
            budget: this.state.budget,
        };
        this.props.addProjectsDetails(newProjectDetails);

        this.setState({
            name: "",
            year: "",
            PM: "",
            visual_no: "",
            pr_no: "",
            hr_no: "",
            fr_no: "",
            visual_team: [],
            pr_team: [],
            fr_team: [],
            hr_team: [],
            budget: "",
            errors: {},
        });
        this.toggle();
        window.location.href = "./projects";
    };


    render() {
        return (
            <div>
                <MDBBtn className="light-blue darken-4" onClick={this.toggle}>Add project details</MDBBtn>
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
                                                label="year"
                                                onChange={this.onChange}
                                                value={this.state.year}
                                                id="year"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="Project manager"
                                                onChange={this.onChange}
                                                value={this.state.pm}
                                                id="pm"
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

                                    <MDBRow>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="HR no. volunteers"
                                                onChange={this.onChange}
                                                value={this.state.hr_no}
                                                id="hr_no"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="PR no. volunteers"
                                                onChange={this.onChange}
                                                value={this.state.pr_no}
                                                id="pr_no"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="FR no. volunteers"
                                                onChange={this.onChange}
                                                value={this.state.fr_no}
                                                id="fr_no"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="Visual no. volunteers"
                                                onChange={this.onChange}
                                                value={this.state.vidual_no}
                                                id="visual_no"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow>

                                    {/* <MDBRow>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="HR team"
                                                onChange={this.onChange}
                                                value={this.state.hr_team}
                                                id="hr_team"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="PR team"
                                                onChange={this.onChange}
                                                value={this.state.pr_team}
                                                id="pr_team"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="FR team"
                                                onChange={this.onChange}
                                                value={this.state.fr_team}
                                                id="fr_team"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="3">
                                            <MDBInput size="sm"
                                                label="Visual team"
                                                onChange={this.onChange}
                                                value={this.state.visual_team}
                                                id="visual_team"
                                                type="text"
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow> */}

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


AddProjectsDetailsModal.propTypes = {
    addProjectsDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { addProjectsDetails }
)(AddProjectsDetailsModal);