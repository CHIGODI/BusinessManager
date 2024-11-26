from .models import Product, Sale
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for the Product model"""
    class Meta:
        model = Product
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    """Serializer for the Sale model"""
    class Meta:
        model = Sale
        fields = '__all__'
