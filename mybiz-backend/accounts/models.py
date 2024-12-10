"""
This module contains the model that represents the
user in the application
"""

from django.db import models
from .managers import CustomUserManager
from core.models import BaseModel as BaseModel
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser, BaseModel):
    """User model for the application"""
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_("email address"), unique=True)
    objects = CustomUserManager()

    class Meta:
        """Meta class for the user model"""
        db_table = "users"
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        """Return the string representation of the user"""
        return 'This is user {} with email {}'.format(self.username,
                                                      self.email)
