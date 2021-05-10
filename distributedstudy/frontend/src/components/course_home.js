import React from 'react';
import {Col, Row, Card} from "react-bootstrap";

function CourseHome({roomid, course_name, id, users}) {
    return (
        <React.Fragment>
            <Col md={11} id='home-content' className={"border border-dark text-center container-fluid"}>
                <div className={"my-auto"}>
                <div >
                    <Card>
                        <h1>{course_name}</h1>
                    </Card>
                </div>
                    <div>Course Id: {roomid}</div>
                    <Row className={"justify-content-center container-fluid"}>
                        <Col md={6}>
                    <div>
                        <Card>
                        CS20 is a fun, collaborative introduction to discrete mathematics for computer science. The course is designed to welcome students to the field of computer science. During our class meetings students work in small groups to collaboratively solve problems with the help of a teaching fellow. Classes are active. Participation counts. We use this teaching methodology not so much because it has been proven to be most effective for learning (though it has!) but because it helps us ensure that during this class you will form collegial relationships with a wide range of peers in computer science and applied math with whom you'll be studying and collaborating throughout college.

A principal objective of CS20 is to not just to teach a set of mathematical topics, but to develop mathematical maturity. Much of what CS20 prepares you to do is to think mathematically and read and write mathematics. By the end of CS20 you should feel comfortable reading mathematical notation and writing formal proofs.

CS20 teaches all the math not taught in the traditional calculus/linear algebra sequence that is needed to take more advanced courses in theory of computation and/or algorithms. That is, CS20 teaches discrete mathematics, logic, and basic probability, but does not teach calculus or linear algebra. Many of the topics in CS20 are not part of the typical secondary school math curriculum. Prospective students may find it helpful to take our "placement test  download" to gauge whether the course material is appropriate for you.

Logistics
This syllabus is subject to change, though we will make great efforts to avoid changing any key dates.

The midterm will be a 1-hour closed book online exam. You will take the exam during our regular class time on March 4th or March 5th.
The final exam will be a 2-hour closed book online exam. FAS exam groups are not yet posted, but tentatively we will plan two exam seatings on Thursday May 6th to accommodate all time zones.
In most weeks, there will one problem set due. All problem sets will be due at 11:59pm. The days of the week on which problem sets will be due will vary.
This class has two sets of meeting times, one set of which you are expected to attend. All class sessions will meet via Zoom. Attendance at class meetings is required (though each student has a bank of flexible absence excuses.) Each student must elect one of the two meeting patterns and stick to it (for reasons of group cohesion and staff allocation):
            </Card>
                    </div>
                            </Col>
                        </Row>
                </div>
            </Col>
        </React.Fragment>

    );
}

export default CourseHome;

 //           {users.map((user) => (
//                <div>{user.id}</div>
  //          ))}