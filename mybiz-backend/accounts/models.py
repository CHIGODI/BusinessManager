from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from core.models import BaseModel as BaseModel


class CustomUser(AbstractUser, BaseModel):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    password = models.CharField(_("password"), max_length=128)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "users"
        verbose_name = _("user")
        verbose_name_plural = _("users")
