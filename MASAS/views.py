import datetime
import soundcloud
import requests

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
    UserStepSerializer,
    LinkSerializer,
    TimeIntervalSerializer,
)

from models import Status, Play, Song, User, UserStep, TimeInterval, Link


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
    filter_fields = ('user', 'song', 'status')

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


class UserStepViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsUserOrReadOnly
    )
    queryset = UserStep.objects.all()
    serializer_class = UserStepSerializer


class LinkViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer


class SongViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Song.objects.filter(deleted=None)
    serializer_class = SongSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('trackArtist', 'deleted')


class TimeIntervalViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = TimeInterval.objects.all()
    serializer_class = TimeIntervalSerializer


class PlayView(APIView):
    serializer_class = SongSerializer

    def _get_song(self, request):
        time_interval_id = None
        if 'time_interval_id' in request.GET:
            time_interval_id = int(request.GET['time_interval_id'])

        songs = Song.objects.filter(deleted=None)

        if time_interval_id:
            songs = songs.filter(
                timeInterval_id=time_interval_id,
            )

        unplayed = songs.exclude(
            play__user=request.user
        ).order_by('?').first()

        if unplayed:
            song = unplayed
        else:
            query = ['''
                select
                    s.*
                from
                    "MASAS_song" s
                where
                    s.deleted is NULL
            ''']
            query_vars = []

            if time_interval_id:
                query.append('''
                and s."timeInterval_id" = %s
                ''')
                query_vars.append(time_interval_id)

            query.append('''
                group by
                    s.id
                order by
                    random()
                limit 1
            ''')
            sql = '\n'.join(query)

            song = Song.objects.raw(sql, query_vars)[0]

        s = soundcloud.Client(client_id=settings.SOUNDCLOUD['CLIENT_ID'])

        try:
            s.get('/tracks/%s' % song.SC_ID)
        except requests.HTTPError as e:
            # Let's not blacklist the song if it's not a 404, because there
            # might be just a network issue between the server and soundcloud's
            # API and we don't want to start a loop where all songs become
            # deleted in this case.
            if e.response.status_code == 404:
                song.deleted = datetime.datetime.now()
                song.save()
                return None

        return song

    def get_song(self, request):
        song = self._get_song(request)

        tries = 10
        while song is None and tries > 0:
            song = self._get_song(request)
            tries -= 1

        return song

    def post(self, request, format=None):
        song = self.get_song(request)

        s = soundcloud.Client(client_id=settings.SOUNDCLOUD['CLIENT_ID'])
        try:
            s.get('/tracks/%s' % song.SC_ID)
        except requests.HTTPError:
            song.deleted = datetime.datetime.now()
            song.save()
            return None

        return song

    def get_song(self, request):
        song = self._get_song(request)

        while song is None:
            song = self._get_song(request)

        return song

    def post(self, request, format=None):
        song = self.get_song(request)

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
            'ALLOWED_HOSTS': settings.ALLOWED_HOSTS,
            'RAVEN_JS_DSN': getattr(settings, 'RAVEN_JS_DSN', None),
            'SOUNDCLOUD': settings.SOUNDCLOUD,
            'FB': {
                'KEY': settings.SOCIAL_AUTH_FACEBOOK_KEY,
            },
        }

        return c
