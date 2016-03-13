import soundcloud

from django.conf import settings

from rest_framework import serializers

from models import Like, Play, Song, User


class SongSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, data):
        s = soundcloud.Client(client_id=settings.SOUNDCLOUD['CLIENT_ID'])
        r = s.get('/tracks/%s' % data['SC_ID'])

        return Song.objects.create(
            trackArtist=self._context['request'].user,
            SC_ID=data['SC_ID'],
            trackTitle=r.title,
            trackDuration=r.duration,
        )

    class Meta:
    	model = Song
    	fields = (
            'url',
            'trackTitle',
            'trackArtist',
            'trackDuration',
            'SC_ID',
            'dateUploaded'
        )


class PlaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Play
        fields = ('pk', 'url', 'user', 'song')


class LikeSerializer(serializers.HyperlinkedModelSerializer):
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
