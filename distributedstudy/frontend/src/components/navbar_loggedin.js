import React, {useContext, useEffect} from "react";
import {Row} from "react-bootstrap";
import {csrfContext, userContext} from "./App";
import axios from "axios";



const Navbar_loggedIn = () => {

    const headers = useContext(csrfContext)
    const username = useContext(userContext)


    const logoutHandler = async user => {
    try{
        await axios.post(`/api/users/logout/logout/`, user, {'headers': headers})
        .then((response) => {
            if (response.data["msg"] === 'success') {
                window.location.href = 'http://localhost:8000/'
            }
        })
        } catch (err) {
        console.log(err)
    }
    }

    const logoutUser = (e) => {
    e.preventDefault()
    logoutHandler({
        loggedIn: false,
        username: username['user']
        })
    }

    return(
        <React.Fragment>
            <Row>
            <div className="row align-items-start">
                <nav
                    className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <div className="col">
                            <a className="navbar-brand h1"
                               href="/study">Distributed Study</a>
                            <button className="navbar-toggler" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarCollapse"
                                    aria-controls="navbarCollapse"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="col-lg-2 " id={"nav-bar-div"}>
                            <div className="collapse navbar-collapse "
                                 id="navbarCollapse">
                                <ul className="navbar-nav me-auto  mb-2 mb-md-0">

                                    <li  className="nav-item p-3">
                                        <a  className="nav-link btn btn-primary btn-lg"
                                           id="login"
                                           href="/your_courses">Courses</a>
                                    </li>
                                    <li className="nav-item p-3">
                                        <a className="nav-link btn btn-primary btn-lg"
                                           href="/"
                                           onClick={logoutUser}
                                           id="register"
                                           tabIndex="-1">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </Row>
        </React.Fragment>
    )
}

export default Navbar_loggedIn