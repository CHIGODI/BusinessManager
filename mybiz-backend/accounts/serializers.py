"""Serializers for the User model"""
from django.contrib.auth import get_user_model
from rest_framework import serializers

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model"""
    class Meta:
        model = CustomUser
        fields = 'username', 'email', 'password',
        'created_at', 'updated_at', 'id'

        extra_kwargs = {
            'password': {'write_only': True}
        }

    # overide default serializer create_user to hash password
    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
