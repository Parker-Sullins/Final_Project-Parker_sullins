import React, {useState, useContext} from 'react';
import axios from "axios";
import { Form, Button } from 'react-bootstrap'
import {csrfContext} from "./App";

function RegisterForm(props) {

    const headers = useContext(csrfContext)

    const registerInfo = async newUser => {
        try{
            await axios.post(`/api/users/register/register/`, newUser, {'headers': headers})
            .then((response) => {
                if (response.data["msg"] === 'success') {
                    window.location.href = 'http://localhost:8000/study'
                }
                if (response.data["msg"] === 'Username already taken.') {
                    let register_alert = document.getElementById('register-alert')
                    register_alert.innerText = "Username Already Taken."
                    register_alert.hidden = false;
                }
                if (response.data["msg"] === "password incorrect.") {
                    let register_alert = document.getElementById('register-alert')
                    register_alert.innerText = "Passwords Do Not Match"
                    register_alert.hidden = false;
                }
                if (response.data["msg"] === "Username Too Long.") {
                    let register_alert = document.getElementById('register-alert')
                    register_alert.innerText = "Username Too Long."
                    register_alert.hidden = false;
                }
            })

        } catch (err) {
            console.log(err)
        }

    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')

    const registerHandler = (e) => {
        e.preventDefault()
        registerInfo({
            username: username,
            password: password,
            confirm_password: confirmation,
            first_name: first_name,
            last_name: last_name
        })

    }

    return (
        <React.Fragment>
            <h1 className={"text-center"}>Register</h1>
            <Form action="" method="post">
                <div className="form-group">
                    <input className="form-control" type="email" name="email"
                           placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email"
                           name="First Name" placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email"
                           name="Last Name" placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password"
                           name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password"
                           name="confirmation" placeholder="Confirm Password" onChange={e => setConfirmation(e.target.value)}/>
                </div>

                <input className="btn btn-primary" type="submit"
                       value="Register" onClick={registerHandler}/>
            </Form>
            Already have an account? <a href="/login">Log In
            here.</a>
            <div className="alert alert-warning alert-dismissible fade show"
                 role="alert" hidden={true} id={"register-alert"}>
                <strong id={'password-alert'}></strong>
            </div>
        </React.Fragment>
    );
}

export default RegisterForm;


