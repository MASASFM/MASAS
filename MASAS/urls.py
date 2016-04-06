from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from cities_light.contrib.restframework3 import (
    CityModelViewSet,
    CountryModelViewSet,
    RegionModelViewSet
)

from . import views

check_user = views.CheckUserViewSet.as_view()


router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'usersteps', views.UserStepViewSet)
router.register(r'links', views.LinkViewSet)
router.register(r'songs', views.SongViewSet)
router.register(r'statuses', views.StatusViewSet)
router.register(r'plays', views.PlayViewSet)
router.register(r'time-intervals', views.TimeIntervalViewSet)

router.register(r'cities', CityModelViewSet,
                base_name='cities-light-api-city')
router.register(r'countries', CountryModelViewSet,
                base_name='cities-light-api-country')
router.register(r'regions', RegionModelViewSet,
                base_name='cities-light-api-region')

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
