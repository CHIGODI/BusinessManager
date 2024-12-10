#!/usr/bin/env python

"""
This module contains the URL configuration for the inventory app.
"""
from django.urls import path
from .views import ProductListCreate


urlpatterns = [
    path('products/', ProductListCreate.as_view(), name='all_products'),
    path('products/<str:product_id>/', ProductListCreate.as_view(), name='update_product'),
]
