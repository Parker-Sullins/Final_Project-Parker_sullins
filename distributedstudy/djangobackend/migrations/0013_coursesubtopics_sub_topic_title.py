# Generated by Django 3.2.2 on 2021-05-09 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangobackend', '0012_auto_20210509_1604'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursesubtopics',
            name='sub_topic_title',
            field=models.CharField(default=1, max_length=60),
            preserve_default=False,
        ),
    ]
