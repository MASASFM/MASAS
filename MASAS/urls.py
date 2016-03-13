from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

check_user = views.CheckUserViewSet.as_view()


router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'songs', views.SongViewSet)
router.register(r'likes', views.LikeViewSet)
router.register(r'plays', views.PlayViewSet)


urlpatterns = format_suffix_patterns([
    url(
        r'^api/play/$',
        views.PlayView.as_view(),
        name='play'
    ),
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
