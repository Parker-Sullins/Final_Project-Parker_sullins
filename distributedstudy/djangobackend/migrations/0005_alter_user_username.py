# Generated by Django 3.2.2 on 2021-05-07 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangobackend', '0004_user_loggedin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
