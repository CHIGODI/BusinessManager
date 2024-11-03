"""This module contains the model for products"""

from django.db import models
from ..core.models import BaseModel


class Product(BaseModel):
    """Model for products"""
    name = models.CharField(max_length=255, null=False, blank=False)
    buying_price = models.DecimalField(max_digits=6, default=0.0,
                                       decimal_places=2, null=False)
    selling_price = models.DecimalField(max_digits=6, default=0.0,
                                        decimal_places=2, null=False)
    manufacturer = models.TextField(max_length=255, null=True)
    industry_choices = [
        ('Agriculture', 'Agriculture'),
        ('Manufacturing', 'Manufacturing'),
        ('Technology', 'Technology'),
        ('Health', 'Health'),
        ('Food', 'Food'),
        ('Fashion', 'Fashion'),
        ('Construction', 'Construction'),
        ('Transport', 'Transport'),
        ('Uncategorized', 'Uncategorized')]

    industry = models.TextField(max_length=255,
                                choices=industry_choices,
                                default='Uncategorized',
                                null=False)
    quantity = models.IntegerField(null=False, default=0)

    class Meta:
        """Control behavior of the model"""
        db_table = 'products'
        ordering = ['name']

    def __str__(self):
        return self.name


class Sale(BaseModel):
    """Model for sales"""
    product = models.ForeignKey(Product, on_delete=models.PROTECT,
                                related_name='sales')
    quantity = models.IntegerField(null=False, default=0)
    discount = models.DecimalField(max_digits=6, default=0.0,
                                   decimal_places=2, null=True)
    total_cost = models.DecimalField(max_digits=6, default=0.0,
                                     decimal_places=2, null=False)

    class Meta:
        """Control behavior of the model"""
        db_table = 'sales'
        ordering = ['created_at']

    def __str__(self):
        return f'{self.product} {self.number_products_sold}'
