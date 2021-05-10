import React from 'react';
import {Button, Nav, Row} from "react-bootstrap";

function CourseSideNav({courseName, id}) {
    return (
        <React.Fragment>
            <Nav defaultActiveKey="" className="flex-column" id={"nav-container"}>
                    <Row id={"row2"}>
                       <Button href={'/your_courses'} className={"btn mb-4  "}>Your Courses</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary mb-4"} href={`/course/${id}`}>{courseName}</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary mb-4"} href={ `/topics/${id}`}>Topics</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary mb-4"} href={`/coming_soon/${courseName}`}>Flash Cards</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary mb-4"} href={`/coming_soon/${courseName}`}>Student Questions</Button>
                        <Button id={'side-nav-button'} className={"btn btn-secondary mb-4"} href={`/coming_soon/${courseName}`}>Study Groups</Button>
                    </Row>
            </Nav>
        </React.Fragment>
    );
}

export default CourseSideNav;