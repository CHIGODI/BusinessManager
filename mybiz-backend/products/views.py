"""This module contains the views for the inventory app"""
from .models import Product
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import ProductSerializer
from .permissions import IsAdminOrReadOnly
from rest_framework import generics, status
from rest_framework.response import Response


class ProductListCreate(generics.ListCreateAPIView):
    """ View to list all products or create a new product
        /api/v1/products/
    """
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """View to retrieve, update or delete a product
        /api/v1/products/<str:product_id>/
    """
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, product_id):
        """ handle GET request for a single product
            /api/v1/products/<str:product_id>/
        """
        product = get_object_or_404(Product, id=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, product_id):
        """ handle update for a single product
            /api/v1/products/<str:product_id>/
        """
        product = get_object_or_404(Product, id=product_id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id):
        """ handle DELETE request for a single product
            /api/v1/products/<str:product_id>/
        """
        product = get_object_or_404(Product, id=product_id)
        product.delete()
        return Response({"message": "Product deleted successfully."},
                        status=status.HTTP_204_NO_CONTENT)
