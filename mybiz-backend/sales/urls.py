#!/usr/bin/env python

"""
This module contains the URL configuration for the Sale app.
"""
from django.urls import path
from .views import SalesListCreate, SaleDetail


urlpatterns = [
    path('', SalesListCreate.as_view(), name='sales_list_create'),
    path('<str:sale_id>/', SaleDetail.as_view(), name='sale_detail'),
]
