import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";

import Navbar_loggedIn from "./navbar_loggedin";
import TopicsView from "./topics_view";
import CourseSideNav from "./course_side_nav";

import {useParams} from "react-router";
import {csrfContext} from "./App";
import axios from "axios";
import CoursesView from "./courses_view";


function CourseTopics() {

//-----------State Handling-------------
//---------------------------------------
    const {id} = useParams()

    const headers = useContext(csrfContext)
    const [courseName, setName] = useState('Course')
    const [topics, setTopic] = useState(['Topic'])

    console.log(courseName)

//---Course Name and Course ID retriever-----
//--------------------------------------------
    useEffect(()=> {
    courseHandler()
    }, [])

    const courseHandler = () => {
    getCourse({id: id})
    }

    const getCourse = async course => {
        try{
            await axios.post(`/api/courses/getcourse/getcourse/`, course, {'headers': headers})
            .then((response) => {
                setName(response.data["data"][1])
                console.log(response.data["data"][1])
            })
        } catch (err) {
            console.log(err)
        }
    }

 //-------Topics retriever based on Course Id--
//----------------------------------------------
    useEffect(()=> {
    topicsHandler()
    }, [])

    const topicsHandler = () => {
        getTopics({id:id})
    }

    const getTopics = async topic => {
        try{
            await axios.post(`/api/coursecontent/gettopic/gettopic/`, topic, {'headers': headers})
            .then((response) => {
                response = response.data["data"]
                console.log(response)
                setTopic(response)
            })
        } catch (err) {
            console.log(err)
        }
    }
//---------------------------------------------

    return (
                <React.Fragment>
            <Navbar_loggedIn/>
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><CourseSideNav courseName={courseName['courseName']} id={id} /></Col>
                <Col md={11} className={""}>
                    <Row className={'mt-3 border'} >
                        <Col md={12} className={" d-flex justify-content-end "}>
                    <Button href={`/addtopic/${id}`}>Add a Topic</Button>
                        </Col>

                    <Row className={" container-fluid"}>
                        <div className={"text-center"}><h1><strong>Class Topics</strong></h1></div>
                    </Row>
                    </Row>
                        <Row id={"topics-container"}>
                        {topics.map((topic) => (
                        <TopicsView topic={topic.topic_title} description={topic.description} content_id={topic.content_id}
                                     chapters={topic.chapters}
                        />
                        ))}

                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    );
}

export default CourseTopics;

                   //     <CourseHome roomid={roomid["courseID"]} course_name={courseName["courseName"]}
                    //                id={courseid["id"]} users ={users["Users"]}/>