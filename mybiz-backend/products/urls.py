#!/usr/bin/env python

"""
This module contains the URL configuration for the Product app.
"""
from django.urls import path
from .views import ProductListCreate


urlpatterns = [
    path('products/', ProductListCreate.as_view(), name='all_products'),
    path('products/<product_id> : str>/', ProductListCreate.as_view(), name='update_product'),
]
