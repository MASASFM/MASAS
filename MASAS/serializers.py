from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import Song, UserProfile

class GroupSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Group
		fields = ('url', 'name',)

# class LikesSerializer(serializers.HyperlinkedModelSerializer):
# 	# songs = serializers.PrimaryKeyRelatedField(many=True, queryset=Song.objects.all())

# 	class Meta:
# 		model = Likes
# 		# lookup_field = 'song'
# 		fields = ('url', 'user',)

class SongSerializer(serializers.HyperlinkedModelSerializer):
	#trackArtist = serializers.ReadOnlyField(source='trackArtist.username')
	# likesBy = LikesSerializer(many=True)
	# likedBy = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
	# dislikedBy = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

	class Meta:
		model = Song
		fields = ('url', 'trackTitle', 'trackArtist', 'trackDuration', 'SC_ID', 'dateUploaded')

# class LikesSerializer(serializers.HyperlinkedModelSerializer):
# 	# songs = serializers.PrimaryKeyRelatedField(many=True, queryset=Song.objects.all())
# 	song = SongSerializer(many=False)

# 	class Meta:
# 		model = Likes
# 		# lookup_field = 'song'
# 		fields = ('song',)

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	# songs = serializers.PrimaryKeyRelatedField(many=True, queryset=Song.objects.all())
	# likes = LikesSerializer(many=True)
	likes = SongSerializer(many=True)
	# dislikes = SongSerializer(many=True)

	class Meta:
		model = UserProfile
		# lookup_field = 'song'
		fields = ('url', 'user', 'likes', 'dislikes')

	def update(self, instance, validated_data):
	# def save(self, *args, **kwargs):
	# 	user_ = self.user
	# 	user_.save(update_fields=('username', 'first_name', 'last_name'), **kwargs)

	# 	return super(Users, self).save(*args, **kwargs)
		# aa = self
		# import ipdb
		# ipdb.set_trace()
		# like = self.data['likes'][0]['url']
		# import ipdb
		# ipdb.set_trace()

		# new_likes = validated_attrs.get('groups')
		# likes = self.likes')
			# import ipdb
			# ipdb.set_trace()
			# instance.likes.add(song)
		instance.likes.add(validated_data['dislikes'][0])
		instance.save()
		# import ipdb
		# ipdb.set_trace()
		# below is needed to reflect the group changes in the response
		# instance = User.objects.get(id=instance.id)

		return instance

class UserSerializer(serializers.HyperlinkedModelSerializer):
	# songs = serializers.PrimaryKeyRelatedField(many=True, queryset=Song.objects.all())
	songs = SongSerializer(many=True)
	# # likes = LikesSerializer(many=True)
	# likes = SongSerializer(many=True)
	userProfile = UserProfileSerializer()

	class Meta:
		model = User
		# lookup_field = 'song'
		fields = ('url', 'username', 'email', 'groups', 'songs', 'userProfile')