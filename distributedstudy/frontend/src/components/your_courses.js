import React, {useContext, useEffect, useState} from 'react';
import { courseContext } from "./App";
import axios from "axios";
import CoursesView from "./courses_view";
import Navbar_loggedIn from "./navbar_loggedin";
import SideNav from "./side_nav";
import {Col, Row} from "react-bootstrap";



function YourCourses(props) {

    const [usercourses, setCourses] = useState(['Mike'])
    const userCourses = async () => {
        try{
            await axios.get(`/api/courses/usercourses/usercourses`)
            .then((response) => {
                setCourses(response.data["msg"])

         })}
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        userCourses()
    }, [])

    console.log(usercourses)

    return (
        <React.Fragment>
            <Navbar_loggedIn />
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><SideNav /></Col>
                <Col md={11} className={"border"}>
                    <Row>
                        {usercourses.map((course) => (
                        <CoursesView courseid={course.courseID} course_name={course.courseName} id={course.id}
                        />
                        ))}
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default YourCourses;


