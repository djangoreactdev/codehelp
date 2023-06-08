from django.contrib import admin

from .models import Profile


@admin.register(Profile)
class UserProfileAdmin(admin.ModelAdmin):
    fields = (
        "user",
        "first_name",
        "last_name",
        "phone",
        "city",
        "updated_date",
    )
    list_display = (
        "user",
        "first_name",
        "last_name",
        "phone",
        "city",
        "updated_date",
    )
    readonly_fields = ("updated_date",)
