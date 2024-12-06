#!/usr/bin/env python

"""
This module contains the URL configuration for the inventory app.
"""
from django.urls import path
from .views import UserListCreate


urlpatterns = [
    path('accounts/', UserListCreate.as_view(), name='all_accounts'),
]
