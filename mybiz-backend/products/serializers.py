from .models import Product, Sale, Expense
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for the Product model"""
    class Meta:
        model = Product
        fields = '__all__'