"""This module contains the views for the inventory app"""

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .serializers import ProductSerializer
from .models import Product
from rest_framework import generics


class ProductListCreate(generics.ListCreateAPIView):
    """View to list all products or create a new product"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        """GET method to retrieve the list of products"""
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """POST method to create a new product"""
        return super().post(request, *args, **kwargs)


class ProductUpdate()
