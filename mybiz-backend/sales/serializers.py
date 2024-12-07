from .models import Sale
from rest_framework import serializers

class SaleSSerializer(serializers.ModelSerializer):
    """Serializer for the Sale model"""
    class Meta:
        model = Sale
        fields = '__all__'
