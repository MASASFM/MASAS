import soundcloud

from django import http
from django.conf import settings
from django.core.exceptions import PermissionDenied

from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from cities_light.contrib.restframework3 import CitySerializer

from models import Status, Play, Song, User, UserStep, Link, TimeInterval


class CreateOnlyForMyUserMixin(object):
    def create(self, data):
        if self._context['request'].user != data['user']:
            raise PermissionDenied()

        return super(CreateOnlyForMyUserMixin, self).create(data)


class SongSerializer(serializers.HyperlinkedModelSerializer):
    play_count = serializers.IntegerField(read_only=True)
    like_count = serializers.SerializerMethodField()

    def get_like_count(self, obj):
        return getattr(obj, 'like_count', None)

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
            'deleted',
            'dateUploaded',
            'play_count',
            'like_count',
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

    validators = []

    def create(self, validated_data):
        if self._context['request'].user != validated_data['user']:
            raise PermissionDenied()

        defaults = {}
        if 'status' in validated_data:
            defaults = dict(status=validated_data.get('status'))

        obj, created = Status.objects.update_or_create(
            user=validated_data['user'],
            song=validated_data['song'],
            defaults=defaults,
        )
        return obj

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


class UserStepSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserStep
        fields = (
            'url',
            'pk',
            'user',
            'step',
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    city = CitySerializer()
    link_set = LinkSerializer(many=True)

    songs = SongSerializer(many=True)
    likes = StatusListSerializer(many=True)
    dislikes = StatusListSerializer(many=True)
    usersteps = UserStepSerializer(many=True)

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
            'usersteps',
        )
