# Generated by Django 3.2.2 on 2021-05-08 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangobackend', '0007_auto_20210508_1132'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursecontent',
            name='course_images',
        ),
        migrations.AddField(
            model_name='course',
            name='course_images',
            field=models.ImageField(default='../distributedstudy/frontend/static/images/brain.jpg', upload_to='../distributedstudy/frontend/static/images'),
        ),
    ]
