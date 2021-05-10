import React from "react";
import Form from 'react-bootstrap/Form'
import {Row} from "react-bootstrap";

const Navbar = ({prop}) => {
    return(
        <React.Fragment>

            <Row>
            <div className="row align-items-start">
                <nav
                    className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <div className="col">
                            <a className="navbar-brand h1"
                               href="/">Distributed Study</a>
                            <button className="navbar-toggler" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarCollapse"
                                    aria-controls="navbarCollapse"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="col-lg-2">
                            <div className="collapse navbar-collapse "
                                 id="navbarCollapse">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item p-3">
                                        <a className="nav-link btn btn-primary btn-lg"
                                           id="login"
                                           href="/login">Login</a>
                                    </li>
                                    <li className="nav-item p-3">
                                        <a className="nav-link btn btn-primary btn-lg"
                                           href="/register"
                                           id="register"
                                           tabIndex="-1">Register</a>
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

export default Navbar


