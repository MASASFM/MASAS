from django.contrib import admin

from models import Song, SiteUser


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


admin.site.register(Song)
