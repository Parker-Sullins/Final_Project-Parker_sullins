import React from 'react';
import {Row, Col, Card, Button} from "react-bootstrap";

function CoursesView({id, course_name}) {
    return (
        <React.Fragment>
                <Card style={{ width: '18rem' }} className={'m-5'}>
                  <Card.Img className={"img-thumbnail"} variant="top" src={'/static/images/brain.jpg'} />
                  <Card.Body>
                    <Card.Title>{course_name}</Card.Title>
                    <Card.Text>
                      Course Description Can Be Edited In The Course's Settings.
                    </Card.Text>
                    <Button variant="primary" href={`/course/${id}`}>Go To Course</Button>
                  </Card.Body>
                </Card>
        </React.Fragment>
    )
}

export default CoursesView;