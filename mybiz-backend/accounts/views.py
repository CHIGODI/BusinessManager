from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import generics, status
import jwt, datetime


CustomUser = get_user_model()

class RegisterView(generics.GenericAPIView):
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
        return Response(self.serializer_class(user).data, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = CustomUser.objects.filter(email=email).first()
        if user is None:
            raise ValidationError("User not found")
        if not user.check_password(password):
            raise ValidationError("Incorrect password")
        payload = {
            "id": user.id,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.now(datetime.timezone.utc),
        }
        token = jwt.encode(payload, "secret", algorithm="HS256")
        return Response({"token": token}, status=status.HTTP_200_OK)

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer