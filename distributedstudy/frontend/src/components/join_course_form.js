import React, {useContext, useState} from 'react';
import Navbar_loggedIn from "./navbar_loggedin";
import {Col, Form, Row} from "react-bootstrap";
import SideNav from "./side_nav";
import CoursesView from "./courses_view";
import {csrfContext} from "./App";
import axios from "axios";

function JoinCourseForm(props) {

    const headers = useContext(csrfContext)
    const [code, setCode] = useState('')

    const codeHandler = (e) => {
        e.preventDefault()
        joinCourse({
            code: code
        })
    }

    const joinCourse = async (code) => {
        await axios.post('/api/courses/joincourse/joincourse/', code, {"headers": headers})
            .then((response) => {
                console.log(response)
                window.location.href = 'http://localhost:8000/your_courses'
            })
    }

    return (
        <React.Fragment>
            <Navbar_loggedIn />
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><SideNav /></Col>
                <Col md={11} className={"d-flex container-fluid justify-content-center align-items-center pb-5"}>
                        <Row>
                        <br/>
                        </Row>
                    <Row id={"join-form"} className={"border border-dark mb-5"}>
                        <h1 className={"text-center"}>Join a Course</h1>
                        <Form action="" method="post">
                            <div className="form-group m-2">
                                <input className="form-control" type="text" name="email"
                                       placeholder="Course Code" onChange={e => setCode(e.target.value)}/>
                            </div>
                            <div className="m-2 text-center">
                            <input className="btn btn-primary" type="submit"
                                   value="join" onClick={codeHandler}/>
                            </div>
                        </Form>
                        <div className="alert alert-warning alert-dismissible fade show mt-3"
                             role="alert"   hidden={true} id={"course-alert"}>
                            <strong id={'password-alert'}></strong>
                        </div>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default JoinCourseForm;