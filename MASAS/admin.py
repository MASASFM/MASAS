from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from models import Play, Song, User, TimeInterval


class UserAdmin(BaseUserAdmin):
    list_display = [
        '__unicode__',
        'is_active',
    ]
    list_editable = [
        'is_active',
    ]
admin.site.register(User, UserAdmin)


class SongAdmin(admin.ModelAdmin):
    list_display = [
        'dateUploaded',
        'trackTitle',
        'trackArtist',
        'timeInterval',
        'deleted',
    ]

admin.site.register(Song, SongAdmin)
admin.site.register(Play)
admin.site.register(TimeInterval)
