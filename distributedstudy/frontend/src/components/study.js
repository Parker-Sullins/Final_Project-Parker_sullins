import React, {useContext} from 'react';
import Navbar_loggedIn from "./navbar_loggedin";
import axios from "axios";
import {csrfContext, userContext} from './App'
import SideNav from "./side_nav";
import {Row, Col} from "react-bootstrap"
import CreateCourse from "./create_course";

function Study() {

    const current_user = useContext(userContext)
    const headers = useContext(csrfContext)
    console.log(current_user)




    return (
        <React.Fragment>
            <Navbar_loggedIn />
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><SideNav /></Col>
                <Col md={11} id={"img-col"} className={"align-self-center"}>
                    <a>
                        <img id={"brain-home"} src="/static/images/brain.jpg"/>
                    </a>
                </Col>
            </Row>

        </React.Fragment>

    );
}

export default Study;