from .models import Sale
from uuid import UUID
from rest_framework import status
from products.models import Product
from .serializers import SaleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class SalesListCreate(APIView):
    """ views for creating and listing sales
        /api/v1/sales
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """ get all sales """
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """ create a sale """
        sales_data = request.data.get('sales', [])
        if not sales_data:
            return Response({'error': 'No sales data provided'},
                            status=status.HTTP_400_BAD_REQUEST)

        # calculating the total for each sale and apply the discount
        product_ids = [UUID(str(sale['product'])) for sale in sales_data]
        Products = Product.objects.filter(id__in=product_ids)
        products = {product.id: product for product in Products}

        for sale in sales_data:
            price = products[UUID(sale['product'])].unit_selling_price
            discount = sale.get('discount', 0) / 100
            total = float(price) * sale['quantity']
            sale['total'] = total - (total * discount)

        serializer = SaleSerializer(data=sales_data, many=True)
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
