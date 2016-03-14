from __future__ import unicode_literals
from django.contrib.auth.models import (
    AbstractUser,
    UserManager,
)

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class TimeIntervalManager(models.Manager):
    pass


class TimeInterval(models.Model):
    start = models.PositiveIntegerField()
    end = models.PositiveIntegerField()

    objects = TimeIntervalManager()

    def __unicode__(self):
        return '%s-%s' % (self.start, self.end)


class Song(models.Model):
    dateUploaded = models.DateTimeField(auto_now_add=True)
    trackTitle = models.CharField(max_length=100, blank=True, default='')
    trackArtist = models.ForeignKey(
        'User',
        null=True,
        related_name='songs',
    )
    trackDuration = models.IntegerField(help_text='in ms')
    SC_ID = models.IntegerField(unique=True)
    timeInterval = models.ForeignKey('TimeInterval')

    def __unicode__(self):
        return self.trackTitle


class UserManager(UserManager):
    pass


class Like(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User')
    song = models.ForeignKey('Song')

    class Meta:
        unique_together = ('user', 'song'),


class Play(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User')
    song = models.ForeignKey('Song')


class User(AbstractUser):
    likes = models.ManyToManyField(Song, through=Like, null=True, related_name='likedBy', blank=True)
    dislikes = models.ManyToManyField(Song, null=True, related_name='dislikedBy', blank=True)

    objects = UserManager()
