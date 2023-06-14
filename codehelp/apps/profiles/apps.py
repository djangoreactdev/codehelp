from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "codehelp.apps.profiles"

    def ready(self):
        from codehelp.apps.profiles import signals
