from rest_framework import serializers
from models import Song, SiteUser


class SongSerializer(serializers.HyperlinkedModelSerializer):
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
    	model = SiteUser
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
