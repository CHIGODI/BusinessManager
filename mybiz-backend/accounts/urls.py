#!/usr/bin/env python

"""
This module contains the URL configuration for the accounts app.
"""
from django.urls import path
from .views import RegisterView, LogoutView, UserList


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
