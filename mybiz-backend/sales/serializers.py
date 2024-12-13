from .models import Sale
from rest_framework import serializers

class SaleSerializer(serializers.ModelSerializer):
    """Serializer for the Sale model"""
    class Meta:
        model = Sale
        fields = '__all__'

    
    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than 0")
        return value
    
    def validate_discount(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Discount must be greater than or equal to 0")
        return value
    
    def validate_total(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Total must be greater than or equal to 0")
        return value
