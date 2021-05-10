import React, {useContext, useEffect, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {csrfContext} from "./App";

function AddSubTopic({topicName, contentid, parentid}) {

    const [title, setTitle]= useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

    const headers = useContext(csrfContext)

    const submitSubTopic = async (info) => {

        console.log(info)
        await axios.post('/api/subtopics/addpost/addpost/', info , {'headers': headers})
            .then((response) => {
                console.log(response)
                window.location.href = `http://localhost:8000/course/${parentid}`
            })
    }

    const submissionHandler = (e) => {
        e.preventDefault()
        submitSubTopic({
            title: title,
            description: description,
            link: link,
            contentid: contentid
        })
    }


    return (
        <React.Fragment>
            <Col md={11} className={"border"}>
                    <Row>
                        <div></div>
                        </Row>
                    <Row>

                        <h1 className={"text-center"}>Add a Topic</h1>
                        <Form>
                            <div className="form-group m-2">
                                <input className="form-control" type="text"
                                       placeholder={`${topicName}: Topic Title`} onChange={e => setTitle(e.target.value)}/>
                            </div>
                            <div className="form-group m-2">
                                <input className="form-control" type="text"
                                        placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div className="form-group m-2">
                                <input className="form-control" type="text"
                                       placeholder="Helpful Links and Content" onChange={e => setLink(e.target.value)}/>
                            </div>
                            <div className="m-2 text-center">
                            <input className="btn btn-primary" type="submit"
                                   value="Create Topic" onClick={submissionHandler}/>
                            </div>
                        </Form>
                        <div className="alert alert-warning alert-dismissible fade show mt-3"
                             role="alert"   hidden={true} id={"course-alert"}>
                            <strong id={'password-alert'}></strong>
                        </div>
                  </Row>
                </Col>
        </React.Fragment>
    );
}

export default AddSubTopic;