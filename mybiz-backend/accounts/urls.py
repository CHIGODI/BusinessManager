#!/usr/bin/env python

"""
This module contains the URL configuration for the inventory app.
"""
from django.urls import path
from .views import RegisterView, LoginView, UserList, LogoutView


urlpatterns = [
    path('account/register/', RegisterView.as_view(), name='register'),
    path('account/login/', LoginView.as_view(), name='login'),
    path('account/logout/', LogoutView.as_view(), name='logout'),
    path('account/users/', UserList.as_view(), name='users'),
]
