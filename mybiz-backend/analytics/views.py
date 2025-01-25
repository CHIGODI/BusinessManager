from django.db.models import Sum, F
from sales.models import SaleItem
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from products.models import Product

"""

#filter sales by date
#list of products below low_stock_threshold (new order)
#best moving products based on (weekly/monthly) sales
#total sales for a given period
#profit for a given period

"""


class ProductAnalyticsView(APIView):
    """
    API view to get analytics on product sales.
    Endpoint: /api/v1/analytics/products/
    """
    def get(self, request):
        # Get the period from query parameters or default to the current year
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if not start_date or not end_date:
            current_year = timezone.now().year
            start_date = timezone.datetime(current_year, 1, 1, tzinfo=timezone.utc)
            end_date = timezone.datetime(current_year, 12, 31, tzinfo=timezone.utc)
        else:
            start_date = timezone.datetime.strptime(start_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            end_date = timezone.datetime.strptime(end_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)

        # Query product sales within the date range
        analytics = (
            SaleItem.objects.filter(sale__created_at__range=[start_date,
                                                             end_date])
            .values("product__name")
            .annotate(total_quantity=Sum("quantity"))
            .order_by("-total_quantity")
        )
        # Format response data
        data = [{"product": item["product__name"],
                 "quantity_sold": item["total_quantity"]}
                for item in analytics]

        return Response(data)


class SalesForPeriodView(APIView):
    """
    API view to get total sales for a given period.
    Endpoint: /api/v1/analytics/sales/<start_date>/<end_date>/
    """
    def get(self, request, start_date, end_date):
        # Get the period from query parameters or default to the current year
        start_date = timezone.datetime.strptime(start_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        end_date = timezone.datetime.strptime(end_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)

        if not start_date or not end_date:
            current_year = timezone.now().year
            start_date = timezone.datetime(current_year, 1, 1, tzinfo=timezone.utc)
            end_date = timezone.datetime(current_year, 12, 31, tzinfo=timezone.utc)

       # Query total sales within the date range
        total_sales_for = SaleItem.objects.filter(
            sale__created_at__range=[start_date, end_date]
        ).aggregate(
            total_sales=Sum(F('quantity') * F('product__unit_selling_price'))
        )

        total_buying_price = SaleItem.objects.filter(
            sale__created_at__range=[start_date, end_date]
        ).aggregate(
            total_sales=Sum(F('quantity') * F('product__unit_buying_price'))
        )

        if total_sales_for['total_sales'] is not None and total_buying_price['total_sales'] is not None:
            profit_or_loss = total_sales_for['total_sales'] - total_buying_price['total_sales']


        # Ensure the response is properly formatted
        total_sales_amount = total_sales_for['total_sales'] if total_sales_for['total_sales'] is not None else 0

        if profit_or_loss is not None:
            profit_or_loss = profit_or_loss
            if profit_or_loss < 0:
                res = "loss"
            else:
                res = "profit"

        return Response({"total_sales_for_period": total_sales_amount,
                         res: profit_or_loss})


class ProductsBelowThresholdView(APIView):
    """
    API view to get products below the low stock threshold.
    Endpoint: /api/v1/analytics/products/low-stock/
    """
    def get(self, request):
        # Query products below the low stock threshold
        products = Product.objects.filter(
            quantity__lte=F('low_stock_threshold')
        ).values("name", "quantity", "low_stock_threshold")

        return Response(products)
