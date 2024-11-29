"""Serializers for the User model"""
from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model"""
    class Meta:
        model = User
        fields = 'email', 'username', 'password'
