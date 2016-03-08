
from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from rest_framework.routers import DefaultRouter

from rest_framework import renderers

song_list = views.SongViewSet.as_view({
	'get': 'list',
	'post': 'create'
})
song_detail = views.SongViewSet.as_view({
	'get': 'retrieve',
	'put': 'update',
	'patch': 'partial_update',
	'delete': 'destroy'
})

user_list = views.UserViewSet.as_view({
	'get': 'list',
	'post': 'create'
})
user_detail = views.UserViewSet.as_view({
	'get': 'retrieve',
	'put': 'update'
})

userprofile_list = views.UserProfileViewSet.as_view({
	'get': 'list',
	# 'post': 'create'
})

userprofile_detail = views.UserProfileViewSet.as_view({
	'get': 'retrieve',
	'put': 'update',
	'delete': 'destroy',
	'patch': 'partial_update',
})

example_view = views.ExampleView.as_view()


urlpatterns = format_suffix_patterns([
	# url(r'^$', api_root),
	url(r'^api/songs/$', song_list, name='song-list'),
	url(r'^api/song/(?P<pk>[0-9]+)/$', song_detail, name='song-detail'),
	url(r'^api/users/$', user_list, name='user-list'),
	url(r'^api/users/(?P<pk>[0-9]+)/$', user_detail, name='user-detail'),
	url(r'^api/user-profiles/$', userprofile_list, name='userprofile-list'),
	url(r'^api/user-profiles/(?P<pk>[0-9]+)/$', userprofile_detail, name='userprofile-detail'),
	url(r'^api/check-user/$', example_view, name='user-detail'),
	url(r'^.*', views.SPAView.as_view()),
])
# 	url(r'^api/songs/$', views.SongList.as_view()),
# 	url(r'^api/song/(?P<pk>[0-9]+)/$', views.SongDetail.as_view()),
# 	url(r'^users/$', views.UserList.as_view()),
# 	url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
# 	url(r'^.*', TemplateView.as_view(template_name='index.html')),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)
