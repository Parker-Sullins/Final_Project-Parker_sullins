from django.urls import path, include
from djangobackend.urls import router
from .views import *

urlpatterns = [
#    path("", include("djangobackend.urls")),
    path('', index),
    path('login', index),
    path('register', index),
    path('study', index),
    path('create_course', index),
    path('your_courses', index),
    path('course/<str:id>', index),
    path('topics/<str:id>', index),
    path('addtopic/<str:id>', index),
    path('topic/<str:id>', index),
    path('join_course', index),
    path('coming_soon/<str:courseName>', index)
    ]