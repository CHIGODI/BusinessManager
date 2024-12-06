from .serializers import UserSerializer
from django.http import JsonResponse
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import generics, status


CustomUser = get_user_model()


class UserListCreate(generics.ListCreateAPIView):
    """View to list all users or create a new user"""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    

    def post(self, request, *args, **kwargs):
        """POST method to create a new user"""
        email = request.data.get('email')
        password = request.data.get('password')

        # Validate email and password
        if not email or not password:
            raise ValidationError("Email and password are required.")

        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")

        # Create the user
        user = CustomUser.objects.create_user(email=email, password=password)
        return Response(
            {"message": "User created successfully", "user_id": user.id},
            status=status.HTTP_201_CREATED
        )