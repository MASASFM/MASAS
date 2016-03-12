import soundcloud

from django.conf import settings

from rest_framework import serializers

from models import Like, Song, User


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('user', 'song')


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

class UserSerializer(serializers.HyperlinkedModelSerializer):
    songs = SongSerializer(many=True)
    likes = SongSerializer(many=True)

    class Meta:
    	model = User
    	fields = (
            'url',
            'username',
            'email',
            'groups',
            'songs',
            'likes',
            'dislikes'
        )

    def update(self, instance, validated_data):
    	instance.likes.add(validated_data['dislikes'][0])
    	instance.save()
    	return instance
