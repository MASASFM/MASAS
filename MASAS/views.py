import datetime
import soundcloud
import requests

from django.conf import settings
from django.db.models import Count, Prefetch
from django.shortcuts import render
from django.views import generic

from django.http import HttpRequest,HttpResponse
from django.http import JsonResponse
from json import dumps
from django.core.serializers import serialize

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
    UserEditSerializer,
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

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        return UserEditSerializer


class UserStepViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
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
        songs = Song.objects.filter(deleted=None)

        time_interval_id = request.GET.get('time_interval_id', None)
        if time_interval_id:
            songs = songs.filter(
                timeInterval_id=time_interval_id,
            )

        radio = request.GET.get('radio', 'discover')
        if radio == 'discover':
            songs = songs.order_by('-dateUploaded')
        elif radio == 'popular':
            songs = songs.filter(
                status__status=1,  # like
            ).annotate(
                likes_count=Count('status')
            ).order_by('-likes_count', '-pk')

        key = 'radio_%s' % radio
        previous = request.session.get(key, None)
        song = None
        if previous > 0:
            song = songs.filter(pk__lt=previous).first()

        if not song or song.pk == previous:
            song = songs.first()

        request.session[key] = song.pk
        s = soundcloud.Client(client_id=settings.SOUNDCLOUD['CLIENT_ID'])

        try:
            metadata = s.get('/tracks/%s' % song.SC_ID)
        except requests.HTTPError as e:
            # Let's not blacklist the song if it's not a 404, because there
            # might be just a network issue between the server and soundcloud's
            # API and we don't want to start a loop where all songs become
            # deleted in this case.
            if e.response.status_code == 404:
                song.deleted = datetime.datetime.now()
                song.save()
                return
        else:
            song.metadata = metadata.obj

        return song

    def get_song(self, request):
        if 'song_id' in request.GET:
            song = Song.objects.get(pk=song_id)
        else:
            song = self._get_song(request)

            tries = 10
            while song is None and tries > 0:
                song = self._get_song(request)
                tries -= 1

            if song is None:
                raise Exception('Failed to find song')

        if request.user.is_authenticated():
            Play.objects.create(
                user=request.user,
                song=song,
            )

        song.play_count += 1
        song.save()

        serializer = self.serializer_class(
            instance=song,
            context=dict(
                request=request,
                view=self,
            ),
        )
        return Response(serializer.data)

    def get(self, request):
        return self.get_song(request)


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
