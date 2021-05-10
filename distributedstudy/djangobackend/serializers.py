from rest_framework import serializers
from .models import Course, User, CourseContent, CourseSubTopics


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'loggedIn')


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'course_name', 'roomID', 'password', 'active', 'course_users', 'course_images')


class CourseContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseContent
        fields = ('parent_course_id', "course_topics", "description", "chapters")


class CourseSubTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSubTopics
        fields = ("course_subtopics", "external_content", "post_author", "content_type")
