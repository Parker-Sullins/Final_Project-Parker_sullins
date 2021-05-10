import React, {useContext, useState} from "react";
import { Container} from "react-bootstrap";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import Study from "./study";
import YourCourses from "./your_courses";
import CreateCourse from "./create_course";
import CourseInstance from "./course_instance";
import CourseTopics from "./course_topics";
import AddTopic from "./add_topic";
import TopicInstance from "./topic_instance";
import JoinCourseForm from "./join_course_form";
import ComingSoon from "./coming_soon";
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";


function HomePage()  {

        return (
            <Router>
                <Switch>
                    <Container id={"homepage-container"} fluid>
                    <Route exact path={"/"}><Home /></Route>
                    <Route path={'/login'}>
                        <Login />
                    </Route>
                    <Route exact  path={'/register'} component={Register}></Route>
                    <Route  exact  path={'/study'} component={Study}></Route>
                    <Route exact  path={'/create_course'} component={CreateCourse}></Route>
                    <Route exact  path={'/your_courses'} component={YourCourses}></Route>
                    <Route path={`/course/:id`} component={CourseInstance}></Route>
                    <Route path={`/topics/:id`} component={CourseTopics}></Route>
                    <Route path={`/addtopic/:id`} component={AddTopic}></Route>
                    <Route path={`/topic/:id`} component={TopicInstance}></Route>
                    <Route path={`/join_course`} component={JoinCourseForm}></Route>
                    <Route path={`/coming_soon/:courseName`} component={ComingSoon}></Route>
                    </Container>
                </Switch>
            </Router>
        )
}

export default HomePage