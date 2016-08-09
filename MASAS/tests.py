import datetime

from django import test

import requests
from rest_framework.reverse import reverse
from rest_framework.test import APIClient


import mock

from .models import Status, Play, Song, User


class BaseTestMixin(object):
    def setUp(self):
        '''
        Create an artist with 3 songs and a user for self.client

        Each song has different id and time interval.
        '''
        self.artist = User.objects.create(username='artist')

        for i in range(0, 4):
            self.artist.songs.create(
                trackDuration=i,
                SC_ID=i,
                timeInterval_id=i,
            )

        self.user, c = User.objects.get_or_create(username='test')
        self.user.is_active = True
        self.user.set_password('test')
        self.user.save()

        self.client = APIClient()
        self.client.login(username='test', password='test')


class StatusTest(BaseTestMixin, test.TestCase):
    def like(self, user, song):
        return self.set_status(user, song, 1)

    def set_status(self, user, song, status):
        return self.client.post(
            reverse('status-list'),
            data={
                'user': reverse('user-detail', args=[user]),
                'song': reverse('song-detail', args=[song]),
                'status': status,
            }
        )

    def test_add_like_with_wrong_user_fails(self):
        response = self.like(self.artist.pk, 1)
        self.assertEqual(response.status_code, 403)

    def test_add_to_likes(self):
        response = self.client.get(reverse('song-detail', args=(1,)))
        self.assertEqual(response.json()['like_count'], 0)

        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            list(self.user.status_set.values_list('pk', flat=True)),
            [1]
        )

        response = self.client.get(reverse('song-detail', args=(1,)))
        self.assertEqual(response.json()['like_count'], 1)

        response = self.client.get(reverse('user-detail', args=(self.user.pk,)))
        self.assertEqual(response.json()['likes'][0]['song']['like_count'], 1)

    def test_add_liked_to_likes_updates(self):
        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 201)
        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 201)

        status = Status.objects.get(
            user=self.user,
            song=Song.objects.get(pk=1)
        )
        self.assertEqual(status.status, 1)

    def test_remove_unliked_from_likes_fails(self):
        pass

    def test_remove_liked_from_likes(self):
        pass

    def test_remove_like_with_wrong_user_fails(self):
        pass


class PlayTestBase(BaseTestMixin, test.TestCase):
    class RequestSideEffect(object):
        def __init__(self, fake_response):
            self.count = 0
            self.fake_response = fake_response

        def __call__(self, *a):
            self.count += 1

            if self.count == 1:
                raise requests.HTTPError(response=self.fake_response)

    def get_play_response(self, url=None):
        return self.client.post('%s?%s' % (reverse('play'), url or ''))


class SoundcloudSideEffectTest(PlayTestBase):
    def test_404_marks_as_deleted(self):
        self.execute(status=404, deleted=1)

    def test_504_does_not_delete(self):
        self.execute(status=503, deleted=0)

    def execute(self, status, deleted):
        self.assertEqual(
            Song.objects.exclude(deleted=None).count(),
            0,
        )

        soundcloud_response = mock.Mock()
        soundcloud_response.status_code = status

        with mock.patch('MASAS.views.soundcloud.Client') as Client:
            Client().get.side_effect=self.RequestSideEffect(soundcloud_response)
            response = self.client.post(reverse('play'))
            Client().get.assert_called()

        self.assertEqual(
            Song.objects.exclude(deleted=None).count(),
            deleted,
        )


class PlayTest(PlayTestBase):
    def play(self, time_interval_id=None):
        url = reverse('play')
        if time_interval_id:
            url += '?time_interval_id=%s' % time_interval_id

        with mock.patch('MASAS.views.soundcloud.Client') as Client:
            Client().get.return_value = True
            response = self.client.post(url)
            Client().get.assert_called()

        return response

    def test_post_play_returns_song(self):
        for i in range(0, 4):
            response = self.play()

            self.assertEqual(
                Play.objects.filter(song_id=response.json()['pk']).count(),
                1,
                'Plays exceed 1 for %s' % i
            )

        # Cover the case where there is no unplayed song
        for i in range(0, 4):
            # Just make sure it doesn't crash, this is random now
            response = self.play()

    def test_post_play_skips_deleted(self):
        pks = list(Song.objects.values_list('pk', flat=True))
        survives = pks.pop()
        Song.objects.filter(pk__in=pks).update(
            deleted=datetime.datetime.now()
        )

        for i in range(0, 2):
            # Cover both cases when there is unplayed and when there isn't
            # It should always be the non-deleted song
            response = self.play()
            self.assertEqual(response.json()['pk'], survives)

    def test_post_play_gets_song_from_interval_id(self):
        pks = list(Song.objects.values_list('pk', flat=True))
        inside = pks[:len(pks) / 2]
        outside = pks[(len(pks) / 2):]

        Song.objects.filter(pk__in=inside).update(
            timeInterval_id=1,
        )

        Song.objects.filter(pk__in=outside).update(
            timeInterval_id=2,
        )

        for i in range(0, 6):
            # Cover both cases when there is unplayed and when there isn't
            # It should always be a song with time_interval_id=2
            response = self.play(time_interval_id=1)
            self.assertIn(response.json()['pk'], inside)
