import React, {useState, useEffect} from "react";
import Navbar from "./navbar";
import RegisterForm from "./register_form";
import axios from "axios";
import ReactDOM from "react-dom";
import {Row, Col} from "react-bootstrap";

function Register () {

    const test = async () => {
         await axios.post('api/courses', {
            course_name: 'test',
            roomID: '1234',
            password: '1234'
        })

    }


    const [user, setUser] = useState([])

        const getUser = async () => {
        try {
            const response = await axios.get('/api/users')
            const { data } = response
            setUser(data)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }



    useEffect( () => {
        getUser()
    }, [])



    return(
        <React.Fragment>
            <Row>
            <Navbar />
            </Row>
            <Row className={"justify-content-center"}>
                <img id={"brain"} src="/static/images/brain.jpg"/>
            </Row>
            <Row id={"login-row"}>
                <Col id={"login-form"} >
                    <div id={"test"} >
                        <RegisterForm />
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )


}

export default Register