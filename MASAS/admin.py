from django.contrib import admin

from models import Song


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from models import UserProfile

# Define an inline admin descriptor for UserProfile model
class UserProfileInline(admin.StackedInline):
  model = UserProfile
  can_delete = False

# Define a new User admin
class UserAdmin(UserAdmin):
  inlines = (UserProfileInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


admin.site.register(Song)

# Register your models here.
