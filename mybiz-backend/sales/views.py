import uuid
from decimal import Decimal
from datetime import datetime
from collections import Counter
from rest_framework import status
from .models import Sale, SaleItem
from products.models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models.signals import post_save
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from .serializers import SaleSerializer, SaleItemSerializer
from django.utils import timezone
from datetime import timedelta
from django.utils.timezone import localtime



class SalesListCreate(APIView):
    """ views for creating and listing sales
        /api/v1/sales
        methods: GET, POST
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """ Get all sales grouped by sale ID """
        # Query all Sale objects
        today = timezone.now().date()
        start_of_day = timezone.make_aware(datetime.combine(today, datetime.min.time()))
        end_of_day = start_of_day + timedelta(days=1)

        sales = Sale.objects.filter(created_at__gte=start_of_day, created_at__lt=end_of_day).order_by('-created_at')


        # Prepare the response data
        response_data = []

        for sale in sales:
            # Get all SaleItems related to this Sale
            print(sale)
            sale_items = SaleItem.objects.filter(sale=sale)
            # print(sale_items)
            # break


            # Prepare product details for this sale
            products = [
                {
                    "name": sale_item.product.name,
                    "price": sale_item.product.unit_selling_price,
                    "quantity": sale_item.quantity,
                    "total": (sale_item.product.unit_selling_price *
                              sale_item.quantity)
                }
                for sale_item in sale_items
            ]

            # Calculate the total for this sale
            total_amount = sum(item["total"] for item in products)
            total_amount_with_discount = total_amount - sale.discount

            if datetime.today().date() == sale.created_at.date():
                response_data.append({
                    "sale_id": sale.id,
                    "total_amount": total_amount_with_discount,
                    "discounted_total": sale.discount,
                    "products": products,
                    "payment_method": sale.payment_method,
                    "created_at": sale.created_at,
                })

        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request):
        """ create a sale
        {
            "sales_data": {
                "products": [
                    {
                        "id":"ab01ccb1-f90e-4d14-97d9-f32038f613b2",
                        "quantity_bought": 5
                    },
                    {
                        "id": "7f25cc9a-24b1-4867-bf93-8e730d870a4a",
                        "quantity_bought": 10

                    }
                ],
                "discount": 4,
                "payment_method": "Mpesa"
            }
        }
        """
        sales_data = request.data.get('sales_data', {})
        products = sales_data.get('products', {})
        discount = sales_data.get('discount', 0)
        payment_method = sales_data.get('payment_method', 'Cash')

        if not products:
            return Response({'error': 'No products provided'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Validate discount using the serializer
        sale_serializer = SaleSerializer(data={'discount': discount,
                                               'sold_by': request.user.id,
                                               'payment_method': payment_method})

        if not sale_serializer.is_valid():
            return Response(sale_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        sale = sale_serializer.save()
        total_sales = Decimal(0)

        sale_items = []
        try:
            for product in products:
                product_inst = get_object_or_404(Product, pk=product['id'])
                quantity = product.get('quantity_bought', 1)

                if product_inst.quantity < quantity:
                    return Response({'error': f"Not enough stock "
                                     f" available for {product_inst.name}"},
                                    status=status.HTTP_400_BAD_REQUEST)
                total_sales += Decimal(product_inst.unit_selling_price) * quantity
                sale_items.append(SaleItem(sale=sale, product=product_inst,
                                           quantity=quantity))

            SaleItem.objects.bulk_create(sale_items)
            for sale_item in sale_items:
                post_save.send(sender=SaleItem, instance=sale_item,
                               created=True)

            sale.total = total_sales - Decimal(discount)
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
        methods: GET, DELETE
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
