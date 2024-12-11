from .models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for the Product model"""
    class Meta:
        model = Product
        fields = '__all__'

    def validate_qty(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be negative")
        return value

    def validate_unit_selling_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        return value

    def validate_unit_buying_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        return value
