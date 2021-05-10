import React from 'react';
import {Button, Card} from "react-bootstrap";

function SubTopicsView({title, author, description, link}) {
    return (
        <React.Fragment>
                <Card style={{ width: '18rem' }} className={'m-5 text-center'} id={"test-card"}>
                  <Card.Img className={"img-thumbnail"} variant="top" src={'/static/images/brain.jpg'} />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                      <Card.Text>
                        {link}
                    </Card.Text>
                    <Button variant="primary" href={``}>Author: {author}</Button>
                  </Card.Body>
                </Card>
        </React.Fragment>
    );
}

export default SubTopicsView;