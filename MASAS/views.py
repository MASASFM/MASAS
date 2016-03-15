from django.conf import settings
from django.db.models import Prefetch
from django.shortcuts import render
from django.views import generic

import django_filters

from oauth2_provider.ext.rest_framework.authentication import OAuth2Authentication

from permissions import (
    IsUserOrReadOnly,
    IsOwnerOrReadOnly,
    NoDelete,
)

from rest_framework import decorators
from rest_framework import filters
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
    StatusSerializer,
    StatusListSerializer,
    PlaySerializer,
    SongSerializer,
    UserSerializer,
    LinkSerializer,
    TimeIntervalSerializer,
)

from models import Status, Play, Song, User, TimeInterval, Link


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


class StatusViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user', 'song')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return StatusListSerializer
        return super(StatusViewSet, self).get_serializer_class()


class UserViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsUserOrReadOnly
    )
    queryset = User.objects.prefetch_related('link_set')
    serializer_class = UserSerializer


class LinkViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer


class SongViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('trackArtist',)


class TimeIntervalViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = TimeInterval.objects.all()
    serializer_class = TimeIntervalSerializer


class PlayView(APIView):
    serializer_class = SongSerializer

    def post(self, request, format=None):
        unplayed = Song.objects.exclude(
            play__user=request.user
        ).order_by('?').first()

        if unplayed:
            song = unplayed
        else:
            song = Song.objects.raw('''
                select
                    s.*
                    , count(p.id) as play_count
                from
                    MASAS_song s
                left join
                    MASAS_play p on s.id = p.song_id
                where
                    p.user_id = %s
                group by
                    p.song_id
                order by
                    play_count asc
                    , random()
                limit 1
            ''', [
                request.user.pk
            ])[0]

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
