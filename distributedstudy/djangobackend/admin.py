from django.contrib import admin
from .models import *
# Login your models here.

admin.site.register(User)

admin.site.register(CourseContent)

admin.site.register(Course)

admin.site.register(CourseSubTopics)

