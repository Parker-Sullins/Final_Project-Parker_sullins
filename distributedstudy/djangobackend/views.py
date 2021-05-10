from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import *
#each model below has a serializer
from .models import User, Course, CourseSubTopics, CourseContent

#---------------------------------------------------------------------------------------
#Sub-Topic Model API

#Sub-topic specific api calls and logic
class CourseSubTopicsViewSet(viewsets.ModelViewSet):
    queryset = CourseSubTopics.objects.all()
    serializer_class = CourseSubTopicsSerializer

#Handles adding new post to the DB
#"post" in this context are specific to sub_topics

    @action(methods=['POST'], detail=True)
    def addpost(self, request, pk=None):
        if request.method == "POST":
            title = request.data["title"]
            description = request.data["description"]
            link = request.data["link"]
            contentid = request.data["contentid"]
            user = request.user
            new_sub_topic = CourseSubTopics.objects.create(post_author_id=user.id, parent_content_id=contentid)
            new_sub_topic.external_content = link
            new_sub_topic.description = description
            new_sub_topic.sub_topic_title = title
            new_sub_topic.save()
            test = str(new_sub_topic.sub_topic_title)
            return JsonResponse({"test":test}, safe=False)
        return JsonResponse({"fail": "fail"})

    #Handles getting Sub topics
    @action(methods=['POST'], detail=True)
    def getsubtopic(self, request, pk=None):
        if request.method == "POST":
            sub_id = request.data["contentid"]
            sub_topic = CourseSubTopics.objects.filter(parent_content_id=sub_id).all()
            sub_dict = []
            #Query objects arent Json serializable, must insert each into a dict
            for sub in sub_topic:
                sub_dict.append({"sub_title": sub.sub_topic_title, "description": sub.description,
                                 "author": sub.post_author.username, "link": sub.external_content})
            return JsonResponse({"data": sub_dict})
        return JsonResponse({"fail": "fail"})

#------------------------------------------------------------------------------------------------------------

#Course Content Model API

#Course content specific logic and api, i.e course_content Model
class CourseContentViewset(viewsets.ModelViewSet):
    queryset = CourseContent.objects.all()
    serializer_class = CourseContentSerializer

    # Handles adding new post to the DB
    # "post" in this context are specific to course topics
    @action(methods=['POST'], detail=True)
    def posttopic(self, request, pk=None):
        if request.method == "POST":
            topic = request.data["topic"]
            courseID = request.data["courseid"]
            description = request.data["description"]
            chapters = request.data["chapters"]
            user = request.user
        #Should have a try, except statment
            course_content = CourseContent.objects.create(parent_course_id = courseID)
            course_content.course_topics = topic
            course_content.description = description
            course_content.chapters = chapters
            course_content.save()
            return JsonResponse({"msg": "sux"})
        return JsonResponse({"Error": "error"})

#Handles getting topic specific data
    @action(methods=['POST'], detail=True)
    def gettopic(self, request, pk=None):
        if request.method == "POST":
            id = request.data["id"]
            course_content = CourseContent.objects.filter(parent_course_id=id)
            course_topics_dict = []

            for content in course_content:
                course_topics_dict.append({"parent_course": content.parent_course_id,
                                           "topic_title": content.course_topics,
                                           "content_id": content.id,
                                           "description": content.description,
                                           "chapters": content.chapters})
            return JsonResponse({"data": course_topics_dict})
        return JsonResponse({"Error": "error"})

#I just realized I literally created the same function twice and used it in different places
#too scared to change it lol
    @action(methods=['POST'], detail=True)
    def gettopicinfo(self, request, pk=None):
        if request.method == "POST":
            id = request.data["id"]
            topic_content = CourseContent.objects.filter(id=id)
            course_topics_dict = []
            #Query objects arent Json serializable, must insert each into a dict
            for content in topic_content:
                course_topics_dict.append({"parent_course": content.parent_course_id,
                                           "topic_title": content.course_topics,
                                           "content_id": content.id,
                                           "description": content.description,
                                           "chapters": content.chapters})
            return JsonResponse({"data": course_topics_dict})
        return JsonResponse({"Error": "error"})

#-----------------------------------------------------------------------------------------------------------

#Course Model API


class CourseViewset(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CoursesSerializer

    # Handles new course creation and performs a few backend checks
    @action(methods=['POST'], detail=True)
    def newcourse(self, request, pk=None):
        if request.method == "POST":
            course_name = request.data["course_name"]
            courseID = request.data["courseID"]
            password = request.data["password"]
            confirm = request.data["confirm_password"]
            user = request.user

            if password != confirm:
                return JsonResponse({"msg": "Passwords Do Not Match"})
            if (course_name and courseID and password and user) != '':
                try:
                    course = Course.objects.create()
                    course.course_name = course_name
                    course.roomID = courseID
                    course.password = password
                    course.course_users.add(user)
                    course.save()
                    return JsonResponse({"msg": "success"})
                except IntegrityError:
                    return JsonResponse({"msg": "Room Id Must Be Unique."})
            return JsonResponse({"msg": "Fields Cannot Be Blank."})
        return JsonResponse({"Error": "error"})

    #Gets info about courses users is related to
    @action(methods=['GET'], detail=True)
    def usercourses(self, request, pk=None):
        if request.method == "GET":
            user = request.user
            user_courses = Course.objects.filter(course_users=user)
            course_dict = []
            for course in user_courses:
                course_dict.append({"courseID": course.roomID, "courseName": course.course_name, "id": course.id})
            return JsonResponse({"msg": course_dict})

    #Gets a course by the course ID
    #some components only have access to the course ID
    @action(methods=['POST'], detail=True)
    def getcourse(self, request, pk=None):
        if request.method == "POST":
            ID = request.data['id']
            current_course = Course.objects.get(id=ID)
            course_name = current_course.course_name
            id = current_course.id
            courseID = current_course.roomID
            course_users = current_course.course_users.all()
            users_dict =[]
            for user in course_users:
                users_dict.append({"user": user.username})
            course_dict = [{"courseID": courseID}, {"courseName": course_name}, {"id": id}, {"Users": users_dict}]
            return JsonResponse({"data": course_dict})
        return HttpResponse("POST Request Only.")

    # Gets a course by the course Name
    # some components only have access to the course Name
    @action(methods=['POST'], detail=True)
    def getcourseid(self, request, pk=None):
        if request.method == "POST":
            courseName = request.data["courseName"]
            course = Course.objects.get(course_name=courseName)
            courseID = course.id
            return JsonResponse({"id": courseID})
        return HttpResponse("POST Request Only.")

    #Handles logic of a user joining a course
    @action(methods=['POST'], detail=True)
    def joincourse(self, request, pk=None):
        if request.method == "POST":
            code = request.data["code"]
            user = request.user
            course = Course.objects.get(roomID=code)
            course.course_users.add(user)
            return JsonResponse({"code": course.course_name})
        return HttpResponse("POST Request Only.")

#---------------------------------------------------------------------------------------------------------------------

#User Model API


class UserViewset(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    #Handles registering users
    #Some code is reused from previous assignment views
    @action(methods=['POST'], detail=True)
    def register(self, request, pk=None):
        if request.method == "POST":

            username = request.data["username"]
            if len(username) > 15:
                return JsonResponse({"msg": "Username Too Long."})
            password = request.data["password"]
            confirmation = request.data["confirm_password"]
            f_name = request.data["first_name"]
            l_name = request.data["last_name"]

            #Ensure password matches confirmation
            if password != confirmation:
                return JsonResponse({"msg": "password incorrect."})
            # Attempt to create new user
            try:
                user = User.objects.create_user(username=username, password=password)
                user.first_name = f_name
                user.last_name = l_name
                user.loggedIn = True
                user.save()
                login(request, user)
                return JsonResponse({"msg": "success", "username": username})
            except IntegrityError:
                return JsonResponse({"msg": "Username already taken."})
        return JsonResponse({"error": "Only Post Request Are Allowed"})

    # Handles logging users
    # This is not how we have done it before as I couldn't figure out how to use the django logout function
    # Simply updates the database on whether the user is currently active
    @action(methods=['POST'], detail=True)
    def login(self, request, pk=None):
        if request.method == "POST":

            # Attempt to sign user in
            username = request.data["username"]
            password = request.data["password"]

            try:
                username_instance = User.objects.get(username=username)
                user = authenticate(request, username=username, password=password)

                if user is not None:
                    username_instance.loggedIn = True
                    username_instance.save()
                    login(request, user)
                    return JsonResponse({"message": "User logged in", "user": username})
            except ObjectDoesNotExist:
                return JsonResponse({"message": "Invalid username and/or password."})
        return JsonResponse({"msg": "/login"})

#Handles logging in User
# This is not how we have done it before as I couldn't figure out how to use the django logout function
#Simply updates the database on whether the user is currently inactive
    @action(methods=['POST'], detail=True)
    def logout(self, request, pk=None):
        if request.method == "POST":
            username = request.data['username']
            loggedIn = request.data['loggedIn']

            user = User.objects.get(username=username)
            user.loggedIn = False
            user.save()
            return JsonResponse({"msg": "success"})


#Uneccasry but scared to delete
def index(request):
    return render(request, "djangobackend/index.html")


#Uneccasry but scared to delete
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

