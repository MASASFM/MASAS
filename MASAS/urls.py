from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

# Let's see if this is still required
#song_list = views.SongViewSet.as_view({
#    'get': 'list',
#    'post': 'create'
#})
#
#song_detail = views.SongViewSet.as_view({
#    'get': 'retrieve',
#    'put': 'update',
#    'patch': 'partial_update',
#    'delete': 'destroy'
#})
#
#user_list = views.UserViewSet.as_view({
#    'get': 'list',
#    'post': 'create'
#})
#
#user_detail = views.UserViewSet.as_view({
#    'get': 'retrieve',
#    'put': 'update'
#})

check_user = views.CheckUserViewSet.as_view()


router = DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'song', views.SongViewSet)


urlpatterns = format_suffix_patterns([
    # Let's see if this is still required
    # url(
    #     r'^api/songs/$',
    #     song_list,
    #     name='song-list'
    # ),
    # url(
    #     r'^api/song/(?P<pk>[0-9]+)/$',
    #     song_detail,
    #     name='song-detail'
    # ),
    # url(
    #     r'^api/users/$',
    #     user_list,
    #     name='user-list'
    # ),
    # url(
    #     r'^api/users/(?P<pk>[0-9]+)/$',
    #     user_detail,
    #     name='user-detail'
    # ),
    url(
        r'^api/check-user/$',
        check_user,
        name='user-detail'
    ),
])

urlpatterns += [
    url(r'^api/', include(router.urls)),
    url(
        r'^.*',
        views.SPAView.as_view()
    ),
]
