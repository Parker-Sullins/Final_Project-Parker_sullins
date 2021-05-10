import React, {useContext, useEffect, useState, createContext} from 'react';
import Navbar from "./navbar";
import axios from "axios";
import {Col, Row} from "react-bootstrap";
import LoginForm from "./login_form";



function Login() {

    return (
        <React.Fragment>

            <Row>
            <Navbar />
            </Row>
            <Row className={"justify-content-center"}>
                <img id={"brain"} src="/static/images/brain.jpg"/>
            </Row>
            <Row id={"login-row"}>
                <Col id={"login-form"} >
                    <div id={"test"} >
                        <LoginForm />
                    </div>
                </Col>
            </Row>

        </React.Fragment>

    );
}

export default Login;