import React, {useContext, useState} from 'react';
import {Form, Row} from "react-bootstrap";
import axios from "axios";
import {csrfContext, userContext} from "./App";

function CourseForm(props) {

    const headers = useContext(csrfContext)
    const current_user = useContext(userContext)

    const courseInfo = async newCourse => {
        try{
            await axios.post(`/api/courses/newcourse/newcourse/`, newCourse, {'headers': headers})
            .then((response) => {
                if (response.data["msg"] === "Room Id Must Be Unique."){
                    let register_alert = document.getElementById('course-alert')
                    register_alert.innerText = "Room Id Must Be Unique."
                    register_alert.hidden = false;
                }
                if (response.data["msg"] === "Passwords Do Not Match"){
                    let register_alert = document.getElementById('course-alert')
                    register_alert.innerText = "Passwords Do Not Match"
                    register_alert.hidden = false;
                }
                if (response.data["msg"] === "Fields Cannot Be Blank."){
                    let register_alert = document.getElementById('course-alert')
                    register_alert.innerText = "Fields Cannot Be Blank."
                    register_alert.hidden = false;
                }
                if (response.data["msg"] === "success"){
                    window.location.href = 'http://localhost:8000/your_courses'
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const [coursename, setName] = useState('')
    const [courseid, setID] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [password, setPassword] = useState('')

    const courseHandler = (e) => {
        e.preventDefault()
        courseInfo({
            course_name: coursename,
            password: password,
            confirm_password: confirmation,
            courseID: courseid,
            current_user: current_user['id']
        })

    }

    return (
            <React.Fragment>
            <h1 className={"text-center"}>Create a Course</h1>
            <Form action="" method="post">
                <div className="form-group m-2">
                    <input className="form-control" type="text" name="email"
                           placeholder="Course Title" onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group m-2">
                    <input className="form-control" type="email"
                           name="First Name" placeholder="Course ID" onChange={e => setID(e.target.value)}/>
                </div>
                <div className="form-group m-2">
                    <input className="form-control" type="email"
                           name="Last Name" placeholder="Course Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group m-2">
                    <input className="form-control" type="password"
                           name="password" placeholder="Confirm Password" onChange={e => setConfirmation(e.target.value)}/>
                </div>
                <div className="m-2 text-center">
                <input className="btn btn-primary" type="submit"
                       value="Create Course" onClick={courseHandler}/>
                </div>

            </Form>
            <div className="alert alert-warning alert-dismissible fade show mt-3"
                 role="alert"   hidden={true} id={"course-alert"}>
                <strong id={'password-alert'}></strong>
            </div>
        </React.Fragment>
    );
}

export default CourseForm;