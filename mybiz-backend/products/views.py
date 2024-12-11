"""This module contains the views for the inventory app"""
from .models import Product
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import ProductSerializer
from .permissions import IsAdminOrReadOnly
from rest_framework import generics, status
from rest_framework.response import Response


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


class ProductPut(APIView):
    """ To update a product """
    permission_classes = [IsAdminOrReadOnly]

    def put(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
