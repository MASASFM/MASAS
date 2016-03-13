from __future__ import unicode_literals
from django.contrib.auth.models import (
    AbstractUser,
    UserManager,
)

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Song(models.Model):
    dateUploaded = models.DateTimeField(auto_now_add=True)
    trackTitle = models.CharField(max_length=100, blank=True, default='')
    trackArtist = models.ForeignKey(
        'User',
        null=True,
        related_name='songs',
    )
    trackDuration = models.IntegerField(help_text='in ms')
    SC_ID = models.IntegerField()


class UserManager(UserManager):
    pass


class User(AbstractUser):
    likes = models.ManyToManyField(Song, null=True, related_name='likedBy', blank=True)
    dislikes = models.ManyToManyField(Song, null=True, related_name='dislikedBy', blank=True)

    objects = UserManager()

    @property
    def like_objects(self):
        return self.likes.through.objects.all()

Like = User.likes.rel.through
