import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../layout/Navbar";
import { MDBNavbar } from 'mdbreact';


class Dashboard extends Component {

    render() {

        return (
            <div>
                <MDBNavbar>
                    <Navbar />
                </MDBNavbar>

                <p>Dashboard</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Dashboard);
