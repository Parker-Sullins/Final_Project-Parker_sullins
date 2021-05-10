import React, {useEffect, useState, useContext} from 'react';
import Navbar_loggedIn from "./navbar_loggedin";
import CourseSideNav from "./course_side_nav";
import CourseHome from "./course_home";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router";
import axios from "axios";
import {csrfContext} from "./App";

function CourseInstance() {

    const headers = useContext(csrfContext)
    const {id} = useParams()

    const [courseinstance, setCourse] = useState(['Course'])
    const [courseName, setName] = useState('Course')
    const [courseid, setId] = useState('')
    const [roomid, setRoom] = useState('')
    const [users, setUsers] = useState('')

        const getCourse = async course => {
        try{
            await axios.post(`/api/courses/getcourse/getcourse/`, course, {'headers': headers})
            .then((response) => {
                setCourse(response.data["data"])
                setName(response.data["data"][1])
                setId(response.data["data"][2])
                setRoom(response.data["data"][0])
                setUsers(response.data["data"][3])
            })
        } catch (err) {
            console.log(err)
        }
    }

    console.log(users)

    useEffect(()=> {
        courseHandler()
    }, [])

    const courseHandler = () => {
        getCourse({id: id})
    }

    return (
        <React.Fragment>
            <Navbar_loggedIn/>
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><CourseSideNav courseName={courseName['courseName']} id={courseid['id']} /></Col>
                <Col md={11} className={"border"}>
                    <Row className={'mt-3'}>
                        <div>Class Population: {id}</div>
                    <Row>
                        <CourseHome roomid={roomid["courseID"]} course_name={courseName["courseName"]}
                                    id={courseid["id"]} users ={users["Users"]}/>

                    </Row>
                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    );
}

export default CourseInstance;

