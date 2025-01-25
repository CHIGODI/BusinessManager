"""This module contains the model for products"""

from django.db import models
from core.models import BaseModel
from decimal import Decimal


class Product(BaseModel):
    """Model for products"""
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        verbose_name='Product Name'
    )
    size = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        verbose_name='Product Size'
    )
    unit_buying_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=Decimal('0.00'),
        null=False
    )
    unit_selling_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=Decimal('0.00'),
        null=False
    )
    manufacturer = models.TextField(max_length=255, null=True)
    industry = models.TextField(max_length=255, null=True)
    low_stock_threshold = models.IntegerField(default=0, null=False)
    quantity = models.IntegerField(default=0, null=False)

    class Meta:
        """Control behavior of the model"""
        db_table = 'products'
        verbose_name = "Product"
        verbose_name_plural = "Products"
        unique_together = ['name', 'size']

    def __str__(self):
        return self.name
