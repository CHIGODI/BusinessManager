from django.contrib.auth.models import User
from core.models import BaseModel


class CustomUser(User, BaseModel):
    """Custom user model to add additional fields"""
    pass

    class Meta:
        """Control behavior of the model"""
        db_table = 'users'
        ordering = ['created_at']
