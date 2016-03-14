import soundcloud

from django import http
from django.conf import settings
from django.core.exceptions import PermissionDenied

from rest_framework import serializers
from rest_framework.response import Response

from models import Like, Play, Song, User, TimeInterval


class CreateOnlyForMyUserMixin(object):
    def create(self, data):
        if self._context['request'].user != data['user']:
            raise PermissionDenied()

        return super(CreateOnlyForMyUserMixin, self).create(data)


class SongSerializer(serializers.HyperlinkedModelSerializer):
    play_count = serializers.IntegerField(read_only=True)

    def create(self, data):
        s = soundcloud.Client(client_id=settings.SOUNDCLOUD['CLIENT_ID'])
        r = s.get('/tracks/%s' % data['SC_ID'])

        return Song.objects.create(
            trackArtist=self._context['request'].user,
            SC_ID=data['SC_ID'],
            trackTitle=r.title,
            trackDuration=r.duration,
            timeInterval=data['timeInterval'],
        )

    class Meta:
    	model = Song
    	fields = (
            'url',
            'pk',
            'trackTitle',
            'trackArtist',
            'trackDuration',
            'timeInterval',
            'SC_ID',
            'dateUploaded',
            'play_count',
        )


class TimeIntervalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TimeInterval
        fields = ('pk', 'url', 'start', 'end')


class PlaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Play
        fields = ('pk', 'url', 'user', 'song')


class LikeSerializer(CreateOnlyForMyUserMixin,
                     serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('pk', 'url', 'user', 'song')


class UserLikeSerializer(LikeSerializer):
    song = SongSerializer()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    songs = SongSerializer(many=True)
    like_set = UserLikeSerializer(many=True)

    class Meta:
    	model = User
    	fields = (
            'url',
            'username',
            'email',
            'songs',
            'like_set',
        )
