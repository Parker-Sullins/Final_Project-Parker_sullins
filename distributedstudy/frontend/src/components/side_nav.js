import React, {createContext, useContext, useEffect, useState} from 'react';
import {Button, Nav, Row} from "react-bootstrap";
import axios from "axios";
import {csrfContext, userContext} from "./App";
import YourCourses from "./your_courses";



function SideNav(props) {

    return (
        <React.Fragment>
            <Nav defaultActiveKey="" className="flex-column" id={"nav-container"}>
                    <Row id={"row2"}>
                       <Button href={'/your_courses'} className={"btn mb-4  "}>Your Courses</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary mb-4"} href={'/create_course'}>Create a Course</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary"} href={'/join_course'}>Join a Course</Button>
                    </Row>

            </Nav>
        </React.Fragment>
    );
}

export default SideNav;