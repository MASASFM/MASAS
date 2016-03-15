import soundcloud

from django import http
from django.conf import settings
from django.core.exceptions import PermissionDenied

from rest_framework import serializers
from rest_framework.response import Response

from cities_light.contrib.restframework3 import CitySerializer

from models import Status, Play, Song, User, Link, TimeInterval


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


class StatusSerializer(CreateOnlyForMyUserMixin,
                       serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Status
        fields = ('pk', 'url', 'user', 'song', 'status')


class StatusListSerializer(StatusSerializer):
    song = SongSerializer()


class LinkSerializer(serializers.HyperlinkedModelSerializer):
    link_url = serializers.CharField(source='url')

    class Meta:
        model = Link
        fields = (
            'url',
            'pk',
            'user',
            'name',
            'link_url',
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    city = CitySerializer()
    link_set = LinkSerializer(many=True)

    songs = SongSerializer(many=True)
    likes = SongSerializer(many=True)
    dislikes = SongSerializer(many=True)

    class Meta:
    	model = User
    	fields = (
            'url',
            'username',
            'email',
            'name',
            'city',
            'occupation',
            'avatar_url',
            'link_set',
            'songs',
            'likes',
            'dislikes',
        )
