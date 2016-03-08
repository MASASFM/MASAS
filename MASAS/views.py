from django.shortcuts import render
from django.views import generic
from django.conf import settings

from django.contrib.auth.models import User, Group
from models import Song
from rest_framework import viewsets, serializers
from serializers import UserSerializer, GroupSerializer, SongSerializer, UserProfileSerializer

from rest_framework import serializers

from models import Song, UserProfile
from serializers import SongSerializer
from rest_framework import generics
from rest_framework import permissions
from permissions import IsOwnerOrReadOnly, IsUserOrReadOnly, isLikesOwnerOrReadOnly, IsUserProfileOwnerOrReadOnly

from rest_framework import viewsets

from rest_framework.views import APIView

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from oauth2_provider.ext.rest_framework.authentication import OAuth2Authentication

class UserProfileViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides `list` and `detail` actions.
	"""
	authentication_classes = (SessionAuthentication, BasicAuthentication, OAuth2Authentication)
	permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsUserProfileOwnerOrReadOnly)
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer

	def perform_create(self, serializer):
		serializer.save(url=self.request.user)


		# profile.likes = profile_data.get(
		# 	'is_premium_member',
		# 	profile.is_premium_member
		# )
		# profile.has_support_contract = profile_data.get(
		# 	'has_support_contract',
		# 	profile.has_support_contract
		#  )
		# profile.save()


		return instance


from rest_framework.decorators import detail_route

class UserViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides `list` and `detail` actions.
	"""
	authentication_classes = (SessionAuthentication, BasicAuthentication, OAuth2Authentication)
	permission_classes = (IsUserOrReadOnly, permissions.IsAuthenticatedOrReadOnly)
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def perform_create(self, serializer):
		serializer.save(url=self.request.user)



from rest_framework.decorators import detail_route

class SongViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides `list`, `create`, `retrieve`,
	`update` and `destroy` actions.

	Additionally we also provide an extra `highlight` action.
	"""
	queryset = Song.objects.all()
	serializer_class = SongSerializer
	authentication_classes = (SessionAuthentication, BasicAuthentication, OAuth2Authentication)
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly)

	def perform_create(self, serializer):
		serializer.save(trackArtist=self.request.user)

from rest_framework.response import Response


class ExampleView(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication, OAuth2Authentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly)

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'userPk': unicode(request.user.pk),
            'auth': unicode(request.auth),  # None
        }
        return Response(content)


class SPAView(generic.TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        c = super(SPAView, self).get_context_data(*args, **kwargs)

        c['settings'] = {
            'SOUNDCLOUD': settings.SOUNDCLOUD,
            'FB': {
                'KEY': settings.SOCIAL_AUTH_FACEBOOK_KEY,
            },
        }

        return c
