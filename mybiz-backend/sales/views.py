from collections import Counter
from rest_framework import status
from .models import Sale, SaleItem
from products.models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from .serializers import SaleSerializer, SaleItemSerializer


class SalesListCreate(APIView):
    """ views for creating and listing sales
        /api/v1/sales
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """ get all sales """
        sales = SaleItem.objects.all()
        serializer = SaleItemSerializer(sales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """ create a sale
        {
            "sales_data": {
                "products": [
                    {
                        "created_at": "2024-12-14T16:24:11.213529+03:00",
                        "id": "ab01ccb1-f90e-4d14-97d9-f32038f613b2",
                        "industry": "Agriculture",
                        "low_stock_threshold": 5,
                        "manufacturer": "Twiga",
                        "name": "duduthrin",
                        "quantity": 20,
                        "size": "50ml",
                        "unit_buying_price": 140.00,
                        "unit_selling_price": 200.00,
                        "updated_at": "2024-12-14T16:24:11.213547+03:00"
                    }
                ],
                "discount": 200
            }
        }
        """
        sales_data = request.data.get('sales_data', {})
        products = sales_data.get('products', [])
        discount = sales_data.get('discount', 0)

        if not products:
            return Response({'error': 'No products provided'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Validate discount using the serializer
        sale_serializer = SaleSerializer(data={'discount': discount,
                                               'sold_by': request.user.id})
        if not sale_serializer.is_valid():
            return Response(sale_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        sale = sale_serializer.save()
        total_sales = 0
        product_count = Counter(product['id'] for product in products)

        sale_items = []
        try:
            for product in products:
                product_inst = get_object_or_404(Product, pk=product['id'])
                quantity = product_count.get(product['id'])
                if product_inst.quantity < quantity:
                    return Response({'error': f"Not enough stock available"\
                                     "for {product_inst.name}"},
                                    status=status.HTTP_400_BAD_REQUEST)

                total_sales += product['unit_selling_price'] * quantity
                product_inst.quantity -= quantity
                product_inst.save()

                sale_items.append(SaleItem(sale=sale, product=product_inst,
                                           quantity=quantity))

            SaleItem.objects.bulk_create(sale_items)
            sale.total = total_sales - sale.discount
            sale.save()

            return Response({'message': 'Sale created successfully',
                             'sale': SaleSerializer(sale).data},
                            status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


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
