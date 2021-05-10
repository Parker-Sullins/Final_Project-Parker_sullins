import React, {useState, useContext, useEffect} from 'react';
import {Button, Form, Popover} from "react-bootstrap";
import axios from "axios";
import { csrfContext } from './App'


function LoginForm() {

    const headers = useContext(csrfContext)

    const loginInfo = async user => {
        try{
            await axios.post(`/api/users/login/login/`, user, {'headers': headers})
            .then((response) => {
                if (response.data["message"] === 'User logged in') {
                    let user = response.data["user"]
                    console.log(user)
                    window.location.href = 'http://localhost:8000/study'
                }
                if (response.data["message"] === 'Invalid username and/or password.') {
                    console.log(response.data["message"])
                    let login_alert = document.getElementById('login-alert')
                    login_alert.hidden = false;
                }
                if (response.data["msg"] === '/login') {
                    let login_alert = document.getElementById('login-alert')
                    login_alert.innerText = "Something Went Wrong."
                    login_alert.hidden = false;
                }
            })

        } catch (err) {
            console.log(err)
        }

    }

    const loginHandler = (e) => {
        e.preventDefault()
        loginInfo({
            username: username,
            password: password
        })

    }


    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')

    return (
            <React.Fragment>
            <h1 className={"text-center"}>Login</h1>
            <Form action="" method="post">
                <div className="form-group">
                    <input className="form-control" type="email" name="email"
                           placeholder="Username" onChange={e => setUser(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password"
                           name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>

                <input className="btn btn-primary" type="submit"
                       value="Login" onClick={loginHandler}/>
            </Form>
            <div>
            Don' have an account? <a href="/register">Sign Up Here
            here.</a>
            </div>
            <div className="alert alert-warning alert-dismissible fade show"
                 role="alert" hidden={true} id={"login-alert"}>
                <strong>Invalid username and/or password.</strong>

            </div>
            </React.Fragment>
    );
}

export default LoginForm;