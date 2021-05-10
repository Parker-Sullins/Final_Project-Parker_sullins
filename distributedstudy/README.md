Hello TA!

I was very excited for this project, and it was a great learning experience. I 
had a vision and unfortunately I was not able to completely bring my vision to life.
This project has really given me an appreciation for the complexity of web development,
and I now understand why it takes an entire team of engineers to build and maintain a large
website.

For my project, Distributed Study, I wanted to create an application which would act
as a replacement for in person study groups. Study groups have a huge advantage as
they can share information rapidly, help each other with questions, and point
group members towards helpful content. I wanted to create a distributed study group
to fulfill this void for distance learners. 

I chose React for my frontend rendering as the idea of components seemed to click with my brain. Note I said seemed to.
Learning React was actually a huge undertaking, and I decided to learn how to configure a fully
integrated django and React application without just linking to a React script in my html.
Honestly, getting my application configured to run nicely with django was a huge pain and took several days of head
banging, stackoverflow, and youtube videos. Finally, after many days, I could begin coding. I spent about a week going through
a React course on Udemy, and learned a ton. It focused on Class based components, but after the course I learned 
about functional components and decided to use hooks instead of constructors, and  "prop-drilling". 
My plan was to have Django serve the main index.html template and React would handle the rest. 
This meant React was handling all the front end rendering and DOM manipulation. 
I also had to learn about React Routers and how to link pages through dynamic URLS.
I used Django Views to serve as my back-end API and made my request through React.
I had a lot of trouble in the beginning trying to link components as you would in a SPA, and basically ending up
using React in a poor way. Rather than pure DOM manipulation I had a lot of links routing to a new page
where I would reload the Navigation Bars, and display whichever component I needed in the body.
I knew this was not the best approach, but after a lot of head banging, I went with what was working.
Basically, I ended up taking a django-esque approach as a lot of the pages 
where completely disconnected from one another on the frontend despite appearances. 
This meant a lot of POST and GET request to get the right data.
Repetition of hooks to retrieve similar information multiple times, and a lot of trickery to simulate 
a non-existent global state. The React hook useContext looked like it would solve my global state problem, but it can't be written
to from child components. This meant I used the database to store my global state and 
would make get/post request as needed. It wasn't until today "the last day" that
I finally figured out the true power of React. I realized I could use logic in my return{} statements to
dynamically render different components, and pass down useState data via props. 
I had believed props were only for class based components and this realization 
earlier in the process would have massively simplified my code and project. ("Bye, Bye repetitive request")
This is what I had imagined in my head, but couldn't execute on until the 
last day. My application may seems simple, but I put a TON of work and time into this project and realize I may have been overly 
ambitious in thinking I could learn React and make a stellar application at the same time. I am still very 
proud of my work, and I learned a ton. I feel like I am one more React project or refactoring
away from really gaining some competency in React.

------------------------------------------------------------------------------------------------------
For my application, Users can register, login, and logout. They can also create a course, add topics to the course, and 
add subtopics to each topic. Users can also join other courses if they have the course ID. Below I'll list a brief 
description of every component in my application. Below that is brief description of my Back-end API views, as well as
an explanation of Models.py

!!!!!!!!!!!!!!!***************
To run this project you need to install the dependencies in package.json, 
babel.config.json, webpack.config.js, and requirements.txt

First begin the frontend development server with

npm run dev
 
then run the django server
-***********************************!!!!!!!!!
Also, some links rely on running the django server on http://localhost:8000 
so please set it to that.
-************************************!!!!!!!
You are welcome to register a new account, but their will be no course content for you to explore
You can also opt to login with the info below to see some already made course content.

username: p
password: p

or you can register and add a few courses yourself with the courseID's below

code: A2356B
code: Asvvr76

I really wanted to populate the site with a lot of content for you, 
but I'm running out of time, and I think I've given this project all I can for now.
I know it seems but a humble app, but I promise I put my all into this assignment.
Looking back I can see so many design choices I could have made better, but you
can't know what you don't know yet. 

_________________________________________________________________________________

Also, as far as mobile responsiveness,
I for the life of me could not figure ot fluid-containers/media queries/flexbox, without wrecking
my front-end, and it seemed kind of unfair considering we had never been graded on it before.
That is definitely something I need to work on in the future. It is like halfway IPAD responsive lol.

_______________________________________________________________________________

I still have a lot I want to add, such as the ability to delete posts and courses, Add descriptions
to each course when creating a course rather than the stand in HTML at present,
and add functionality to the Flashcard, student Questions, and study groups section.

There a few bugs here or their as a result of the way I structured the React code and routing,
but I tried my best.

If you have questions or are having trouble getting it running email me at
parker.rsullins@gmail.com


-------------------------------------------------------------------------------------------------------------
-----***Note sub-topics are a child of topics, and topics are a child of courses------------

I didn't have time to comment much of my JS code, hopefully these descriptions are helpful enough

-----------------  **JS Components**    ---------------

add_sub_topic.js
-Handles the creation of subtopics via forms, and handles POST request for the sub-topic Model.

add_topic.js
-Handles the form for creating a topic for a course and POST request for the course_content Model.

App.js
-This is the top level component, I used this and useContext() to handles passing
some global values to child components. Passes the csfrToken, current user, and user's courses 
to lower components via context.

course_form.js
-Handles the creation of new courses

course_home.js
-When a user clicks on "Your Course"  this is the landing page. Displays all the user's courses

course_instance.js
-When a user clicks on an instance of a course this is the landing page, 
updates side navigation for course specific tabs

course_side_nav.js
-course specific side navigation as mentioned from above

course_topics.js
-On the side navigation there is a button called topics, this take the user to a page where they can see every course topic

course_views.js
-This handles the bootstrap CARD displays that populate the "your courses" page. Every course gets a Card.

create_course.js
-Redundant component, but it holds the course_form component which allows users to add new courses

csfr_token.js
-function that retrieves the CSFR token from django to pass to POST request lower in the component tree

home.js
-Application landing page

homepage.js
-This component handles all routing. Anytime a href links to a new url it is routed through this
component which matches it with the correct child component

join_course_form.js
-Handles user input and POST request to join a course by courseID

login.js
-Handles the login page logic and hold the login-form component

login_form.js
--Handles user input and POST request to login user

myContext.js
-simply declares the myContext, createContext value. Exported to App component

navbar.js
-Main nav-bar when a user is not logged in

navbar_loggedin.js
-Updated Navbar after user has logged in

register.js
-Handles the register page logic and holds the register-form component

register_form.js
--Handles user input and POST request to register user

side_nav.js
-side nav, before a user goes into the "Your Courses" tab. Where a user can go to
"your courses" , join a course, or create a course

study.js
-Acts as the new homepage after a user is loggedin.

sub_topics_view.js
-This handles the bootstrap CARD displays that populate the "sub-topics" page linked to every topic.
Every course sub-topic gets a Card.

topics_instance.js
-Handles the logic of gathering a topic instance's info and necessary data

topics_view.js
-This handles the bootstrap CARD displays that populate the "Topics" page linked to every course.
Every course Topic gets a Card.

your_courses.js
-Container Component, retrieves data about every course the user is a member of
and passes it to child components

index.js
-Highest level File. Web-Pack bundles all the javascript from App Component down, and 
creates a main.js file which is served to the django index.html template

-------------------------------------------------------------------------------------------------------------
**Views, API, and Model explanation**

I discovered ViewSets and instantly fell in love. It makes querying your database/models a breeze. 
I assigned each Model a Serializer in Serializers.py, which is used by ViewSets to handle the models.

**Models**
_________

class User(AbstractUser):
    Handles User data, username, password,etc

class Course(models.Model):
    Handles the creation of courses, course Name, Course ID, and Description

class CourseContent(models.Model):
    Handles Course Topics, description of topics, and related Chapters

class CourseSubTopics(models.Model):
    Handles course sub-topics, description of sub-topics, and external content


**Views, API**
------------------------
class CourseSubTopicsViewSet(viewsets.ModelViewSet):
    def addpost
        -Handles adding new subtopics
    def getsubtopic
         -retrieves subtopics for the frontend


class CourseContentViewset
    def posttopic
        -Handleds creation of new Topics
    def gettopic
         -retrieves topics for the frontend
    def gettopicinfo
        -Gets specific info related to each topic


class CourseViewset
    def newcourse
        -Handles creation of new courses in the DB
    def usercourses
        -retrieves a list of all user's courses
    def getcourse
        -gets a specific courses info
    def getcourseid
        -helper function for serving course ID's for certain components
    def joincourse
        -Handles logic of adding users to existing courses

class UserViewset
    def register
        -handles registering user in the DB
    def login
        -handles logging in user marking them as active in the DB
    def logout
        -handles logging out user marking them as inactive in the DB

Thanks for Grading, I know it's a lot.