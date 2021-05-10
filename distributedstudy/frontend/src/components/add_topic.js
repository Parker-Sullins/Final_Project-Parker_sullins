import React, {useContext, useEffect, useState} from 'react';
import Navbar_loggedIn from "./navbar_loggedin";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import CourseSideNav from "./course_side_nav";
import CourseHome from "./course_home";
import {useParams} from "react-router";
import axios from "axios";
import {csrfContext} from "./App";

function AddTopic(props) {

    const {id} = useParams()
    const headers = useContext(csrfContext)
    const [courseinstance, setCourse] = useState(['Course'])
    const [courseName, setName] = useState('Course')
    const [courseid, setId] = useState('')
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [chapters, setChapters] = useState('')

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
                setCourse(response.data["data"])
                setName(response.data["data"][1])
                setId(response.data["data"][2])
            })
        } catch (err) {
            console.log(err)
        }}


    const topicInfo = (e) => {
        e.preventDefault()
        postTopics({
            courseid: id,
            topic: topic,
            description: description,
            chapters: chapters
        })}

        const postTopics = async (info) => {
            try{
                await axios.post(`/api/coursecontent/posttopic/posttopic/`, info, {'headers': headers})
                    .then ((response) => {
                        window.location.href = `http://localhost:8000/topics/${id}`
                    })
            } catch (err) {
                console.log(err)
            }
        }

    return (
            <React.Fragment>
            <Navbar_loggedIn/>
            <Row className={"mt-2"}>
                <Col id={"side-nav"} md={1} className={"pt-3"}><CourseSideNav courseName={courseName['courseName']} id={courseid['id']} /></Col>
                <Col md={11} className={"border"}>
                    <Row>
                        <div>Class Population: {id}</div>
                        </Row>
                    <Row>

                        <h1 className={"text-center"}>Add a Topic</h1>
                        <Form action="" method="post">
                            <div className="form-group m-2">
                                <input className="form-control" type="text" name="text"
                                       placeholder="Topic Title" onChange={e => setTopic(e.target.value)}/>
                            </div>
                            <div className="form-group m-2">
                                <input className="form-control" type="text"
                                       name="" placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div className="form-group m-2">
                                <input className="form-control" type="text"
                                       name="password" placeholder="Relevant Chapters" onChange={e => setChapters(e.target.value)}/>
                            </div>
                            <div className="m-2 text-center">
                            <input className="btn btn-primary" type="submit"
                                   value="Create Topic" onClick={topicInfo}/>
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

export default AddTopic;