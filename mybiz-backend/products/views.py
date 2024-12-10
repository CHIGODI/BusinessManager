"""This module contains the views for the inventory app"""
from .serializers import ProductSerializer
from .models import Product
from rest_framework import generics
from .permissions import IsAdminOrReadOnly


class ProductListCreate(generics.ListCreateAPIView):
    """View to list all products or create a new product"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """View to retrieve, update or delete a product"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
