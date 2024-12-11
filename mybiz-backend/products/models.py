"""This module contains the model for products"""

from django.db import models
from core.models import BaseModel


class Product(BaseModel):
    """Model for products"""
    name = models.CharField(max_length=255, null=False, blank=False,
                            unique=True, verbose_name='Product Name')
    unit_buying_price = models.DecimalField(max_digits=6, default=0.0,
                                            decimal_places=2, null=False)
    unit_selling_price = models.DecimalField(max_digits=6, default=0.0,
                                             decimal_places=2, null=False)
    manufacturer = models.TextField(max_length=255, null=True)
    industry = models.TextField(max_length=255,
                                default='Uncategorized',
                                null=False)
    quantity = models.IntegerField(null=False, default=0)
    size = models.CharField(max_length=255, null=True)
    low_stock_threshold = models.PositiveIntegerField(default=0)

    class Meta:
        """Control behavior of the model"""
        db_table = 'products'
        ordering = ['name']

    def __str__(self):
        return self.name
