from .models import Sale
from rest_framework import status
from .serializers import SaleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class SalesListCreate(APIView):
    """ views for creating and listing sales
        /api/v1/sales
    """

    def get(self, request):
        """ get all sales """
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        """ create a sale """
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sold_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaleDetail(APIView):
    """ views for retrieving, updating and deleting a sale
        /api/v1/sales/<int:id>
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, sale_id):
        """ get a sale detail """
        sale = get_object_or_404(Sale, pk=sale_id)
        serializer = SaleSerializer(sale)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, sale_id):
        """ delete a sale """
        sale = get_object_or_404(Sale, pk=sale_id)
        sale.delete()
        return Response({"message": "Sale deleted successfully."},
                        status=status.HTTP_204_NO_CONTENT)
