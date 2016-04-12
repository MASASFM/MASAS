import datetime

from django import test

import requests
from rest_framework.reverse import reverse
from rest_framework.test import APIClient


import mock

from .models import Status, Play, Song, User


class BaseTestMixin(object):
    def setUp(self):
        self.artist = User.objects.create(username='artist')

        for i in range(0, 4):
            self.artist.songs.create(
                trackDuration=i,
                SC_ID=i,
                timeInterval_id=i,
            )

        self.user, c = User.objects.get_or_create(username='test')
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
                # We're logged in as test user, this should fail
                'user': reverse('user-detail', args=[user]),
                'song': reverse('song-detail', args=[song]),
                'status': status,
            }
        )

    def test_add_like_with_wrong_user_fails(self):
        response = self.like(self.artist.pk, 1)
        self.assertEqual(response.status_code, 403)

    def test_add_to_likes(self):
        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            list(self.user.status_set.values_list('pk', flat=True)),
            [1]
        )

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


class PlayTest(BaseTestMixin, test.TestCase):
    class SideEffect(object):
        def __init__(self, fake_response):
            self.count = 0
            self.fake_response = fake_response

        def __call__(self, *a):
            self.count += 1

            if self.count == 1:
                raise requests.HTTPError(response=self.fake_response)

    def play(self,
             deleted=None,
             time_interval_id=None,
             soundcloud_side_effect=None):

        with mock.patch('MASAS.views.soundcloud.Client') as Client:
            if soundcloud_side_effect is None:
                Client().get.return_value = True
            else:
                Client().get.side_effect=soundcloud_side_effect

            url = reverse('play')

            if time_interval_id:
                url += '?time_interval_id=%s' % time_interval_id

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
            response = self.play()

            play_count = Play.objects.filter(song_id=response.json()['pk']).count()

            self.assertEqual(
                play_count,
                2,
                'Plays is not 2 for %s, it is %s' % (i, play_count)
            )

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

    def test_post_play_deletes_on_404(self):
        fake_response = mock.Mock()
        fake_response.status_code = 404

        self.assertEqual(
            Song.objects.exclude(deleted=None).count(),
            0
        )

        response = self.play(
            soundcloud_side_effect=self.SideEffect(fake_response)
        )

        self.assertEqual(
            Song.objects.exclude(deleted=None).count(),
            1
        )

    def test_post_play_ignores_soundcloud_connection_failure(self):
        fake_response = mock.Mock()
        # SoundCloud's API is down ! We shouldn't mark any song as deleted and
        # just let the client handle it
        fake_response.status_code = 503

        self.assertEqual(
            Song.objects.exclude(deleted=None).count(),
            0
        )

        response = self.play(
            soundcloud_side_effect=self.SideEffect(fake_response)
        )

        self.assertEqual(
            Song.objects.exclude(deleted=None).count(),
            0
        )
