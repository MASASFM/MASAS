import os

from django.conf.urls import url, include
from django.views import generic
from django import http
from django.contrib import admin
from django.views.generic import TemplateView

from rest_framework import routers


class VerificationView(generic.View):
    def get(self, request, *args, **kwargs):
        return http.HttpResponse(os.environ.get('VERIFICATION_STRING'))


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^social/', include('social.apps.django_app.urls', namespace='social')),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^explorer/', include('explorer.urls')),
    url(r'^masas.fm.html', VerificationView.as_view()),
    url(r'^', include('MASAS.urls')),
]
