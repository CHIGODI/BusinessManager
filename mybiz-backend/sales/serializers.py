from .models import Sale, SaleItem
from rest_framework import serializers


class SaleSerializer(serializers.ModelSerializer):
    """Serializer for the Sale model"""
    class Meta:
        model = Sale
        fields = '__all__'

    def validate_discount(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Discount cannot be less than 1.00")
        return value


class SaleItemSerializer(serializers.ModelSerializer):
    """Serializer for the SaleItem model"""
    class Meta:
        model = SaleItem
        fields = '__all__'
