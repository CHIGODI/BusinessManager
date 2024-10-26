from django.db import models
from ..users.models import Base

class Product(models.Model, Base):
    name = models.CharField(max_length=255)
    buying_price = models.DecimalField(max_digits=5, decimal_places=2)
    selling_price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    quantity = models.IntegerField()


    def __str__(self):
        return self.name