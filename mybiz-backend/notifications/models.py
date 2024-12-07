from django.db import models
from core.models import BaseModel

class Notification(BaseModel):
    """Model for notifications"""
    products = models.ManyToManyField('products.Product', related_name="notifications")
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE,
                             related_name='notifications', verbose_name='User')
    message = models.TextField(max_length=255, null=False, blank=False)

    class Meta:
        """Control behavior of the model"""
        db_table = 'notifications'

    def __str__(self):
        return self.title
