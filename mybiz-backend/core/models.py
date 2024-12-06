"""This modules contains the base model for all models in the application"""

from django.db import models
import uuid


class BaseModel(models.Model):
    """This class contains the base model for all models in the application"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id = models.CharField(primary_key=True,
                          default=str(uuid.uuid4()),
                          max_length=36,
                          editable=False)

    class Meta:
        """This models is abstract and should not be created in the database"""
        abstract = True
