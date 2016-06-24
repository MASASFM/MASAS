from __future__ import unicode_literals
from django.contrib.auth.models import (
    AbstractUser,
    UserManager,
)

from django.db import models
from django.db.models import Count
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


class SongManager(models.Manager):
    def all(self):
        return self.annotate(play_count=Count('play'))


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
    deleted = models.DateTimeField(null=True, blank=True, default=None)

    objects = SongManager()

    def __unicode__(self):
        return self.trackTitle


class UserManager(UserManager):
    pass


class Status(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User')
    song = models.ForeignKey('Song')
    status = models.SmallIntegerField(
        choices=(
            (-3, 'Report SPAM'),
            (-2, 'Report Copyright infrigement'),
            (-1, 'Dislike'),
            (1, 'Like'),
            (2, 'Love'),
            (5, 'Life changing'),
        ),
        default=1,
    )

    class Meta:
        unique_together = ('user', 'song'),


class Play(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User')
    song = models.ForeignKey('Song')


class User(AbstractUser):
    name = models.CharField(max_length=100, default=None, null=True, blank=True)
    city = models.ForeignKey('cities_light.City', null=True, blank=True)
    occupation = models.CharField(max_length=150, null=True, blank=True)
    avatar_url = models.URLField(null=True, blank=True)

    objects = UserManager()

    @property
    def likes(self):
        return self.status_set.filter(user=self, status=1)

    @property
    def dislikes(self):
        return self.status_set.filter(user=self, status=-1)

# Monkey patch to disable active by default
User._meta.get_field_by_name('is_active')[0].default = False


class UserStep(models.Model):
    STEP_CHOICES = (
        (1, 'Accepted terms and conditions'),
        (2, 'Can log in'),
    )

    user = models.ForeignKey('User', related_name='usersteps')
    step = models.PositiveIntegerField(choices=STEP_CHOICES)


class Link(models.Model):
    user = models.ForeignKey('User')
    name = models.CharField(max_length=100, null=True, blank=True)
    link = models.URLField()
