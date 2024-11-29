from django.contrib import admin
from .models import Product, Sale

# Registering the models with the admin site
admin.site.register(Product)
admin.site.register(Sale)
