from django import test

from rest_framework.reverse import reverse

from .models import Like, Song, User


class LikeTest(test.TestCase):
    def setUp(self):
        self.artist = User.objects.create(username='artist')

        for i in range(0, 4):
            self.artist.songs.create(trackDuration=i, SC_ID=i)

        u, c = User.objects.get_or_create(username='test')
        u.set_password('test')
        u.save()

        self.client = test.Client()
        self.client.login(username='test', password='test')

    def test_add_liked_to_likes_fails(self):
        response = self.client.post(
            reverse('like-list'),
            data={
                # We're logged in as test user, this should fail
                'user': reverse('user-detail', args=[self.artist.pk]),
                'song': reverse('user-detail', args=[1]),
            }
        )
        self.assertEqual(response.status_code, 400)

    def test_add_liked_to_likes(self):
        pass

    def test_remove_unliked_from_likes_fails(self):
        pass

    def test_remove_liked_from_likes(self):
        pass

    def test_add_liked_to_likes_with_wrong_user_fails(self):
        pass

    def test_remove_liked_from_likes_with_wrong_user_fails(self):
        pass
