from django.conf import settings
from django.shortcuts import render
from django.views import generic

from oauth2_provider.ext.rest_framework.authentication import OAuth2Authentication

from permissions import (
    IsOwnerOrReadOnly,
    IsUserOrReadOnly,
    isLikesOwnerOrReadOnly,
    IsRequestUserOrReadOnly,
)

from rest_framework import generics
from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import (
    generics,
    permissions,
    serializers,
    viewsets,
)

from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication
)

from rest_framework.decorators import detail_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from serializers import (
    LikeSerializer,
    SongSerializer,
    UserSerializer,
)

from models import Like, Song, User


class BaseModelViewSetMixin(object):
    authentication_classes = (
        SessionAuthentication,
        BasicAuthentication,
        OAuth2Authentication
    )


class LikeViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsRequestUserOrReadOnly
    )
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class UserViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsRequestUserOrReadOnly
    )
    queryset = User.objects.prefetch_related('like_set__song', 'songs')
    serializer_class = UserSerializer


class SongViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class CheckUserViewSet(BaseModelViewSetMixin, APIView):
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
