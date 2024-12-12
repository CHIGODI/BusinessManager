#!/usr/bin/env python

"""
This module contains the URL configuration for the accounts app.
"""
from django.urls import path
from .views import RegisterView, LogoutView, UserList


urlpatterns = [
    path('account/register/', RegisterView.as_view(), name='register'),
    path('account/logout/', LogoutView.as_view(), name='logout'),
    path('account/users/', UserList.as_view(), name='users')
]
