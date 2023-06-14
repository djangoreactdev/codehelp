from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, EmailField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.db import models
from codehelp.users.managers import UserManager
import uuid


class User(AbstractUser):
    """
    Default custom user model for CodeHelp.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    # First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=50, blank=True, null=True)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=50, blank=True, null=True)
    email = EmailField(_("email address"), unique=True)
    username = models.CharField(verbose_name=_("Username"), max_length=255, unique=True, blank=True, null=True)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    pkid = models.BigAutoField(primary_key=True, editable=False)

    objects = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.username

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.username
