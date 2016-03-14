from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from models import Song, User, TimeInterval

admin.site.register(User)
admin.site.register(Song)
admin.site.register(TimeInterval)
