from .serializers import UserSerializer
from django.http import JsonResponse
from rest_framework import generics
from django.contrib.auth.models import User

class UserListCreate(generics.ListCreateAPIView):
    """View to list all users or create a new user"""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        """GET method to retrieve the list of users"""
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """POST method to create a new user"""
        return super().post(request, *args, **kwargs)