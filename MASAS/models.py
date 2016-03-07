from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    dateUploaded = models.DateTimeField(auto_now_add=True)
    trackTitle = models.CharField(max_length=100, blank=True, default='')
    trackArtist = models.ForeignKey('auth.user', null=True, related_name='songs') 
    trackDuration = models.IntegerField()		# in ms
    SC_ID = models.IntegerField()
    # likedBy = models.ManyToManyField('auth.user', null=True, related_name='likes', blank=True) 
    # dislikedBy = models.ManyToManyField('auth.user', null=True, related_name='dislikes', blank=True) 

    def save(self, *args, **kwargs):
	"""
	add song entry when song is added ?
	"""
	super(Song, self).save(*args, **kwargs)

class UserProfile(models.Model):
    user = models.OneToOneField('auth.user', related_name='userProfile')
    likes = models.ManyToManyField(Song, null=True, related_name='likedBy', blank=True) 
    dislikes = models.ManyToManyField(Song, null=True, related_name='dislikedBy', blank=True) 

    def save(self, *args, **kwargs):
	"""
	add song entry when song is added ?
	"""
	super(UserProfile, self).save(*args, **kwargs)
