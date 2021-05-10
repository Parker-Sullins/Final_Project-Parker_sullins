import React, {useState} from 'react';
import Navbar_loggedIn from "./navbar_loggedin";
import SideNav from "./side_nav";
import {Col, Row} from "react-bootstrap";
import CourseForm from "./course_form";

function CreateCourse(props) {

    return (
        <React.Fragment>
        <Navbar_loggedIn />
            <Row>
            <Col id={"side-nav"} md={1} className={"pt-3"}><SideNav /></Col>
            <Col md={{span:5, offset:3}}  className={"justify-content-center"}>
            <div className={"mt-5 border"}>
                <CourseForm />
            </div>
            </Col>
            </Row>
        </React.Fragment>
        );
}

export default CreateCourse;