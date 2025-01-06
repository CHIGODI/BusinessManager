from .models import Sale, SaleItem
from rest_framework import serializers


class SaleSerializer(serializers.ModelSerializer):
    """Serializer for the Sale model"""
    class Meta:
        model = Sale
        fields = '__all__'

    def validate_discount(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError(
                "Discount must be positive number")
        return value


class SaleItemSerializer(serializers.ModelSerializer):
    """Serializer for the SaleItem model"""
    class Meta:
        model = SaleItem
        fields = '__all__'

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than 0")
        return value
