import React from 'react';
import Navbar from "./navbar";
import {Row, Col} from "react-bootstrap";

function Home(props) {
    return (
        <React.Fragment>
            <Navbar />

            <Row className={"justify-content-center"}>
                    <img id={"brain-home"} src="/static/images/brain.jpg"/>
            </Row>


        </React.Fragment>
    );
}

export default Home;