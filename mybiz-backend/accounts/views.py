import jwt
from os import getenv
from dotenv import load_dotenv
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta, timezone
from rest_framework.exceptions import ValidationError


load_dotenv()
CustomUser = get_user_model()


class RegisterView(generics.GenericAPIView):
    """Register a new user/Create a new User"""
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = CustomUser.objects.filter(email=email).first()
        if user is not None:
            raise ValidationError("User with this email already exists")
        user = CustomUser(email=email)
        user.set_password(password)
        user.save()
        return Response(self.serializer_class(user).data,
                        status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    """Logs in a user"""
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = CustomUser.objects.filter(email=email).first()
        print(email, password)

        if not email or not password:
            raise ValidationError("Email and password are required")
        if user is None:
            raise ValidationError("User not found")
        if not user.check_password(password):
            raise ValidationError("Incorrect password")

        issued_at = datetime.now(timezone.utc)
        expiration_time = issued_at + timedelta(minutes=60)

        payload = {
            "id": user.id,
            "exp": expiration_time.isoformat(),
            "issued_at": issued_at.isoformat(),
        }

        token = jwt.encode(payload, getenv('SECRET'), algorithm="HS256")
        res = Response({"message": "Success"})
        res.set_cookie('jwt', token, httponly=True, secure=True)

        return res


class LogoutView(generics.GenericAPIView):
    """Deletes the JWT"""
    def post(self, request):
        res = Response({"message": "Success"})
        res.delete_cookie('jwt')
        return res


class UserList(generics.ListCreateAPIView):
    """List all users"""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
