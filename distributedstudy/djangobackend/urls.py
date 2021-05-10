
from django.urls import path
from rest_framework import routers
from . import views

urlpatterns = [
    path("logout", views.logout_view, name="logout"),
]

router = routers.DefaultRouter()
router.register('courses', views.CourseViewset, basename='courses'),
router.register('users', views.UserViewset, basename='users'),
router.register('coursecontent', views.CourseContentViewset, basename='content'),
router.register('subtopics', views.CourseSubTopicsViewSet, basename='subtopics')

