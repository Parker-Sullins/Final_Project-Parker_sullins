from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=15, unique=True, blank=False)
    loggedIn = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']


class Course(models.Model):
    course_users = models.ManyToManyField(User, related_name='course')
    course_name = models.CharField(max_length=30)
    roomID = models.CharField(max_length=6, unique=True)
    password = models.CharField(max_length=30)
    active = models.BooleanField(default=True)
    course_images = models.ImageField(upload_to='distributedstudy/images/',
                                      default='distributedstudy/images/brain.jpg')


class CourseContent(models.Model):
    parent_course = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_topics = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=300)
    chapters = models.CharField(max_length=30)


class CourseSubTopics(models.Model):
    parent_content = models.ForeignKey(CourseContent, on_delete=models.CASCADE)
    description = models.CharField(max_length=3)
    external_content = models.URLField(max_length=200)
    sub_topic_title = models.CharField(max_length=60)
    post_author = models.ForeignKey(User, on_delete=models.CASCADE)
