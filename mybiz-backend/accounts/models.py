from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from core.models import BaseModel as BaseModel


class CustomUser(AbstractUser, BaseModel):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_("email address"), unique=True)

    objects = CustomUserManager()

    class Meta:
        db_table = "users"
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.email
