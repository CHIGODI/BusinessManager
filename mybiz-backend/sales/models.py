from django.db import models
from core.models import BaseModel


class Sale(BaseModel):
    """Model for sales"""
    discount = models.DecimalField(max_digits=6, default=0.0,
                                   decimal_places=2, null=True)
    total = models.DecimalField(max_digits=6, default=0.0,
                                decimal_places=2, null=False,
                                verbose_name='Total Price')
    sold_by = models.ForeignKey('accounts.CustomUser',
                                on_delete=models.PROTECT,
                                null=True)

    class Meta:
        """Control behavior of the model"""
        db_table = 'sales'

    def __str__(self):
        return f'{self.product} {self.number_products_sold}'


class SaleItem(BaseModel):
    """Intermediate model for sales"""
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE,
                             related_name='sale_items')
    product = models.ForeignKey('products.Product', on_delete=models.PROTECT,
                                verbose_name='Product Name')
    quantity = models.IntegerField(null=False, default=1)

    class Meta:
        """Control behavior of the model"""
        db_table = 'sale_items'

    def __str__(self):
        return f'{self.sale} {self.quantity}'
