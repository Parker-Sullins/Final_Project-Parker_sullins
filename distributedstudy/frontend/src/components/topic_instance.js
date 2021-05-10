import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import Navbar_loggedIn from "./navbar_loggedin";
import CourseSideNav from "./course_side_nav";
import TopicsView from "./topics_view";
import {useParams} from "react-router";
import axios from "axios";
import {csrfContext} from "./App";
import AddSubTopic from "./add_sub_topic";
import SubTopicsView from "./sub_topics_view";

function TopicInstance(props) {

    const {id} = useParams()
    const headers = useContext(csrfContext)
    const [description, setDescription] = useState('')
    const [chapters, setChapters] = useState('')
    const [contentid, setID] = useState('')
    const [title, setTitle] = useState('')
    const [parent, setParent] = useState('')
    const [parentid, setParentId] = useState('')
    const [addpost, setPost] = useState(false)
    const[subtopics, setSubTopics] = useState([])

    useEffect(()=>{
        topicHandler()
    },[])

    const topicHandler = () => {
        getTopicInfo({'id':id})
    }

    const getTopicInfo = async (id) => {
        try {
            await axios.post(`/api/coursecontent/gettopicinfo/gettopicinfo/`, id, {'headers': headers})
            .then((response) => {
                response = response.data["data"]
                response = response[0]
                setTitle(response["topic_title"])
                setChapters(response["chapters"])
                setDescription(response["description"])
                setID(response["content_id"])
                const parentid = response["parent_course"]
                setParentId(parentid)
                const parent = {"id":parentid}
                getParentName(parent)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const getParentName = async (parent) => {
        await axios.post(`/api/courses/getcourse/getcourse/`, parent, {"headers": headers})
            .then((response) => {
                response = response.data["data"]
                response = response[1]
                response = response["courseName"]
                setParent(response)
            })
    }

    useEffect(()=>{
        subTopicHandler()
    },[contentid])

    const subTopicHandler = () => {

        console.log(contentid)
        getSubTopics({
            contentid: contentid
        })
    }

    const getSubTopics = async (id) => {
        await axios.post(`/api/subtopics/getsubtopic/getsubtopic/`, id, {"headers": headers})
            .then((response) => {
                response = response.data["data"]
                console.log(response)
                setSubTopics(response)
            })
    }

    return (
        <React.Fragment>
            <Navbar_loggedIn/>
            <Row>
                <Col id={"side-nav"} md={1} className={"pt-3"}><CourseSideNav courseName={parent} id={parentid} /></Col>
                <Col md={11} className={""}>
                    <Row className={'mt-3 border'} >
                        <Col md={12} className={" d-flex justify-content-end "}>
                    <Button onClick={() => setPost(true)}>Add a Post</Button>
                        </Col>

                    <Row className={" container-fluid"}>
                        <div className={"text-center"}><h1><strong>{title}</strong></h1></div>
                    </Row>
                        <div className={"text-center"}><h1><>{description}</></h1></div>
                        <div className={"text-center"}><h1><>Chapters: {chapters}</></h1></div>

                    </Row>
                    {addpost ? <AddSubTopic headers={headers} parentid={parentid} contentid={contentid} topicName={title}/> : <div></div>}
                    <Row>
                        {subtopics.map((topic)=>(
                            <SubTopicsView  title={topic.sub_title} description={topic.description} author={topic.author} link={topic.link}/>
                        ))}
                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    );
}

export default TopicInstance;

       //                     <Row id={"topics-container"}>
       //                 {topics.map((topic) => (
         //               <TopicsView topic={'topic.topic_title'} description={'topic.description'} content_id={'topic.content_id'}
         //                            chapters={'topic.chapters'}
         //               />
          //              ))}