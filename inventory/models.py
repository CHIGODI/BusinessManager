from django.db import models
from core.models import BaseModel

class Product(BaseModel, models.Model):
    name = models.CharField(max_length=255)
    buying_price = models.DecimalField(max_digits=5, decimal_places=2)
    selling_price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    quantity = models.IntegerField()

    class Meta:
        db_table = 'products'
        ordering = ['name']


    def __str__(self):
        return self.name