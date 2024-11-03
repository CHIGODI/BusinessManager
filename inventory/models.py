"""This module contains the model for products"""

from django.db import models
from core.models import BaseModel


class Product(BaseModel, models.Model):
    """Model for products"""
    name = models.CharField(max_length=255, null=False, blank=False)
    buying_price = models.DecimalField(default=0.0, decimal_places=2,
                                       null=False)
    selling_price = models.DecimalField(default=0.0, decimal_places=2,
                                        null=False)
    manufacturer = models.TextField(max_length=255, null=True)
    category = models.TextField(max_length=255, null=False)
    quantity = models.IntegerField(null=False, default=0)

    class Meta:
        """Control behavior of the model"""
        db_table = 'products'
        ordering = ['name']

    def __str__(self):
        return self.name
