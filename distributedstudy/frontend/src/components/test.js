import React, { useState, useEffect } from "react";
//import '.static/css/Test.css';
import Todo from './todo'
import axios from "axios";
import Navbar from "./navbar";
import {Row, Col} from "react-bootstrap";
import ReactDOM from "react-dom";





function Test() {

    const [courses, setCourse] = useState([])


    const getCourses = async () => {
        try {
            const response = await axios.get('/api/courses/')
            const { data } = response
            setCourse(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    console.log(courses)


     render()
    { return (
              <React.Fragment>
                        <h1>hello</h1>
                          <Navbar />
                        {courses.map((course) => (
                        <Todo id={course.id} course_name={course.course_name}
                            roomID={course.roomID} password={course.password}
                            active={course.active}  />

                  ))}

              </React.Fragment>
          )}
}

export default Test;

ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById('app')
);