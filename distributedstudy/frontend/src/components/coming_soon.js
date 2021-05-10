import React, {useContext, useEffect, useState} from 'react';
import Navbar_loggedIn from "./navbar_loggedin";
import {Col, Row} from "react-bootstrap";
import SideNav from "./side_nav";
import CourseSideNav from "./course_side_nav";
import {useParams} from "react-router";
import axios from "axios";
import {csrfContext} from "./App";

function ComingSoon(props) {

    const headers = useContext(csrfContext)
    const {courseName} = useParams()
    const [courseId, setID] = useState('')

    useEffect(() => {
        idHandler()
    },[])

    const idHandler = () => {
        getID({
            courseName:courseName
        })
    }

    const getID = async (courseName) => {
        await axios.post('/api/courses/getcourseid/getcourseid/', courseName, {"headers": headers})
            .then((response) => {
                response = response.data["id"]
                setID(response)
            })
    }

    return (
        <React.Fragment>
            <Navbar_loggedIn />
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><CourseSideNav courseName={courseName} id={courseId} /></Col>
                <Col md={11} className={"border d-flex justify-content-center"}>
                    <Row className={"d-flex align-items-center"}>
                        <Col>
                            <a><img id={"coming-soon"} src={'/static/images/coming-soon.png'}/></a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ComingSoon;