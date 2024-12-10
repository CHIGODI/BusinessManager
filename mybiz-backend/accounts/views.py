"""
API CBV endpoints for user registration,
login, logout, and users listing
"""
import jwt
from os import getenv
from dotenv import load_dotenv
from django.db.models import Q
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta, timezone
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,  IsAuthenticated


load_dotenv()
CustomUser = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    POST method to create new user
    """
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class LogoutView(generics.GenericAPIView):
    """Deletes the JWT"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            print(refresh_token)

            if not refresh_token:
                return Response({"detail": "Refresh token is required."},
                                status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"detail": "Successfully logged out."},
                            status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListCreateAPIView):
    """List all users"""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
