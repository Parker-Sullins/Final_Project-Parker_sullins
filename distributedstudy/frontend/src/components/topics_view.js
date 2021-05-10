import React from 'react';
import {Button, Card} from "react-bootstrap";
import TopicInstance from "./topic_instance";

function TopicsView({topic, chapters, description, content_id}) {

    return (
        <React.Fragment>
                <Card style={{ width: '18rem' }} className={'m-5 text-center'} id={"test-card"}>
                  <Card.Img className={"img-thumbnail"} variant="top" src={'/static/images/brain.jpg'} />
                  <Card.Body>
                    <Card.Title>{topic}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button variant="primary" href={`/topic/${content_id}`}>Chapters: {chapters}</Button>
                  </Card.Body>
                </Card>
        </React.Fragment>
    );
}

export default TopicsView;

