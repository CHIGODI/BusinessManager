"""Serializers for the User model"""
from .models import CustomUser
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model"""
    class Meta:
        model = CustomUser
        fields = '__all__'
