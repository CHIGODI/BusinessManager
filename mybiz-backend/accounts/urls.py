#!/usr/bin/env python

"""
This module contains the URL configuration for the inventory app.
"""
from django.urls import path
from .views import RegisterView


urlpatterns = [
    path('account/register/', RegisterView.as_view(), name='register'),
]
