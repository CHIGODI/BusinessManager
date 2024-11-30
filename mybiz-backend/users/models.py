from django.contrib.auth.models import AbstractUser
from core.models import BaseModel


class CustomUser(AbstractUser, BaseModel):
    """Custom user model to add additional fields"""
    pass

    class Meta:
        """Control behavior of the model"""
        db_table = 'users'
