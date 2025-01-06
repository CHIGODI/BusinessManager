from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SaleItem
from products.models import Product

@receiver(post_save, sender=SaleItem)
def update_product_quantity(sender, instance, created, **kwargs):
    """ Reduce the product quantity when a sale item is created. """
    if created:
        product = instance.product
        quantity_sold = instance.quantity

        if product.quantity >= quantity_sold:
            product.quantity -= quantity_sold
            product.save()
        else:
            raise ValueError(f"Not enough stock for product {product.name}.")
