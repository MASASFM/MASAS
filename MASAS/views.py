from django.conf import settings
from django.db.models import Count
from django.shortcuts import render
from django.views import generic

from oauth2_provider.ext.rest_framework.authentication import OAuth2Authentication

from permissions import (
    IsUserOrReadOnly,
    IsOwnerOrReadOnly,
    NoDelete,
)

from rest_framework import decorators
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
    PlaySerializer,
    SongSerializer,
    UserSerializer,
    TimeIntervalSerializer,
)

from models import Like, Play, Song, User, TimeInterval


class BaseModelViewSetMixin(object):
    authentication_classes = (
        SessionAuthentication,
        BasicAuthentication,
        OAuth2Authentication
    )


class PlayViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
        NoDelete,
    )
    queryset = Play.objects.all()
    serializer_class = PlaySerializer


class LikeViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class UserViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsUserOrReadOnly
    )
    queryset = User.objects.prefetch_related('like_set__song', 'songs')
    serializer_class = UserSerializer


class SongViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class TimeIntervalViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = TimeInterval.objects.all()
    serializer_class = TimeIntervalSerializer


class PlayView(APIView):
    serializer_class = SongSerializer

    def post(self, request, format=None):
        least_plays = Song.objects.filter(
            play__user=request.user
        ).annotate(
            play_count=Count('play')
        ).order_by(
            'play_count',
        ).distinct().first()

        if least_plays:
            songs = Song.objects.filter(
                play__user=request.user,
            ).annotate(
                play_count=Count('play')
            ).filter(
                play_count__lte=least_plays.play_count,
            ).distinct()

            song = Song.objects.filter(
                pk__in=songs.values_list('pk')
            ).order_by('?').first()
        else:
            song = Song.objects.all().order_by('?').first()

        Play.objects.create(
            user=request.user,
            song=song,
        )

        serializer = self.serializer_class(
            instance=song,
            context=dict(
                request=request,
                format=format,
                view=self,
            ),
        )
        return Response(serializer.data)


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
