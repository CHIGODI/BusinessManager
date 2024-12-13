from django.db import models
from core.models import BaseModel


class Sale(BaseModel):
    """Model for sales"""
    product = models.ForeignKey('products.Product', on_delete=models.PROTECT,
                                related_name='sales',
                                verbose_name='Product Name')
    quantity = models.IntegerField(null=False, default=0)
    discount = models.DecimalField(max_digits=6, default=0.0,
                                   decimal_places=2, null=True)
    total = models.DecimalField(max_digits=6, default=0.0,
                                decimal_places=2, null=False,
                                verbose_name='Total Price')
    sold_by = models.ForeignKey('accounts.CustomUser',
                                on_delete=models.PROTECT,)

    class Meta:
        """Control behavior of the model"""
        db_table = 'sales'

    def __str__(self):
        return f'{self.product} {self.number_products_sold}'
