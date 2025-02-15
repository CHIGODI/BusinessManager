from decimal import Decimal
from django.db import models
from core.models import BaseModel


class Sale(BaseModel):
    """Model for sales"""
    PAYMENT_METHOD_CHOICES = [
        ('Mpesa', 'Mpesa'),
        ('Cash', 'Cash'),
    ]
    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHOD_CHOICES,
        null=True
    )
    discount = models.DecimalField(max_digits=6,
                                   decimal_places=2,
                                   default=Decimal('0.00'),
                                   null=False)
    total = models.DecimalField(max_digits=10, decimal_places=2,
                                default=Decimal('0.00'),
                                null=False,
                                verbose_name='Total Price')
    sold_by = models.ForeignKey('accounts.CustomUser',
                                on_delete=models.PROTECT, null=True)

    class Meta:
        """Control behavior of the model"""
        db_table = 'sales'
        verbose_name = "Sale"
        verbose_name_plural = "Sales"

    def __str__(self):
        return f'{self.sold_by}  ({self.total})'


class SaleItem(BaseModel):
    """Intermediate model for sales"""
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE,
                             related_name='sale_items')
    product = models.ForeignKey('products.Product',
                                on_delete=models.PROTECT,
                                verbose_name='Product Name')
    quantity = models.IntegerField(null=False, default=1)

    class Meta:
        """Control behavior of the model"""
        db_table = 'sale_items'
        verbose_name = "Sale Item"
        verbose_name_plural = "Sale Items"

    def __str__(self):
        return f'{self.product} ({self.quantity})'
