from django import test

from rest_framework.reverse import reverse

from .models import Like, Play, Song, User


class LikeTest(test.TestCase):
    def setUp(self):
        self.artist = User.objects.create(username='artist')

        for i in range(0, 4):
            self.artist.songs.create(trackDuration=i, SC_ID=i)

        self.user, c = User.objects.get_or_create(username='test')
        self.user.set_password('test')
        self.user.save()

        self.client = test.Client()
        self.client.login(username='test', password='test')

    def like(self, user, song):
        return self.client.post(
            reverse('like-list'),
            data={
                # We're logged in as test user, this should fail
                'user': reverse('user-detail', args=[user]),
                'song': reverse('song-detail', args=[song]),
            }
        )

    def test_add_like_with_wrong_user_fails(self):
        response = self.like(self.artist.pk, 1)
        self.assertEqual(response.status_code, 403)

    def test_add_to_likes(self):
        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            list(self.user.likes.values_list('pk', flat=True)),
            [1]
        )

    def test_add_liked_to_likes_fails(self):
        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 201)
        response = self.like(self.user.pk, 1)
        self.assertEqual(response.status_code, 400)

    def test_remove_unliked_from_likes_fails(self):
        pass

    def test_remove_liked_from_likes(self):
        pass

    def test_remove_like_with_wrong_user_fails(self):
        pass


class PlayTest(test.TestCase):
    def setUp(self):
        self.artist = User.objects.create(username='artist')

        for i in range(0, 4):
            self.artist.songs.create(trackDuration=i, SC_ID=i)

        self.user, c = User.objects.get_or_create(username='test')
        self.user.set_password('test')
        self.user.save()

        self.client = test.Client()
        self.client.login(username='test', password='test')

    def test_post_play_returns_song(self):
        response = self.client.post(
            reverse('play'),
        )
        self.assertEqual(
            Play.objects.filter(song_id=response.json()['pk']).count(),
            1
        )
