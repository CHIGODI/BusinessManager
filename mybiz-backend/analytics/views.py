"""
#filter sales by date
#list of products below low_stock_threshold (new order)
#best moving products based on (weekly/monthly) sales
#total sales for a given period
#profit for a given period
"""
from django.utils import timezone
from products.models import Product
from sales.models import Sale, SaleItem
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import make_aware, is_naive
from datetime import datetime, timedelta, time, date
from django.db.models.functions import TruncDate,  Cast
from django.db.models import Sum, F,DateTimeField, ExpressionWrapper, DecimalField, Count
from django.db.models import F, Sum, Count, ExpressionWrapper, DecimalField
from django.db.models.functions import TruncDate
from django.db.models.functions import ExtractMonth
from collections import defaultdict
from calendar import month_name

class PerformanceSummary(APIView):
    def get(self, request):
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if start_date and end_date:
            try:
                start_date = timezone.make_aware(datetime.strptime(start_date, "%Y-%m-%d"))
                end_date = timezone.make_aware(datetime.strptime(end_date, "%Y-%m-%d")) + timedelta(days=1)
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

            data = self.get_summary(start_date, end_date)

            return Response({"period": data})

        # No start and end dates – default to today + compare with yesterday
        today = timezone.now().date()
        start_today = timezone.make_aware(datetime.combine(today, datetime.min.time()))
        end_today = start_today + timedelta(days=1)

        start_yesterday = start_today - timedelta(days=1)
        end_yesterday = start_today

        today_data = self.get_summary(start_today, end_today)
        yesterday_data = self.get_summary(start_yesterday, end_yesterday)

        def percent_change(current, previous):
            if previous == 0:
                return 100 if current > 0 else 0
            return round(((current - previous) / previous) * 100, 2)

        comparison = {
            "profit_change_pct": percent_change(today_data["profit"], yesterday_data["profit"]),
            "revenue_change_pct": percent_change(today_data["total_revenue"], yesterday_data["total_revenue"]),
            "items_sold_change_pct": percent_change(today_data["items_sold"], yesterday_data["items_sold"]),
        }

        return Response({
            "period": today_data,
            "yesterday": yesterday_data,
            "comparison": comparison,
        })

    def get_summary(self, start_date, end_date):
        sale_items = SaleItem.objects.filter(sale__created_at__gte=start_date, sale__created_at__lt=end_date)
        sales = Sale.objects.filter(created_at__gte=start_date, created_at__lt=end_date)

        cost_expr = ExpressionWrapper(F("quantity") * F("product__unit_buying_price"), output_field=DecimalField())

        total_cost = sale_items.aggregate(total_cost=Sum(cost_expr))["total_cost"] or 0
        total_revenue = sales.aggregate(
            revenue=Sum(F("total") - F("discount"))
        )["revenue"] or 0
        total_items_sold = sale_items.aggregate(total_qty=Sum("quantity"))["total_qty"] or 0
        number_of_sales = sales.count()
        cash_sales = Sale.objects.filter(
                created_at__gte=start_date, created_at__lt=end_date, payment_method="cash"
            ).aggregate(total_cash_sales=Sum("total"))["total_cash_sales"] or 0
        mpesa_sales = Sale.objects.filter(
            created_at__gte=start_date, created_at__lt=end_date, payment_method="mpesa"
        ).aggregate(total_mpesa_sales=Sum("total"))["total_mpesa_sales"] or 0

       # Daily sales breakdown
        today = date.today()
        sales_over_time = Sale.objects.filter(
            created_at__gte=datetime(today.year, 1, 1),
            created_at__lt=datetime(today.year, 12, 31, 23, 59, 59)
        ).annotate(
            date=TruncDate('created_at'),
            total_minus_discount=ExpressionWrapper(
                F('total') - F('discount'),
                output_field=DecimalField()
            )
        ).values('date').annotate(
            daily_revenue=Sum('total_minus_discount'),
            daily_sales_count=Count('id')
        ).order_by('date')

        # Convert to list and format dates
        daily_sales = []
        for item in sales_over_time:
            daily_sales.append({
                'date': item['date'].strftime('%Y-%m-%d'),
                'revenue': float(item['daily_revenue'] or 0),
                'sales_count': item['daily_sales_count']
            })
        return {
            "total_revenue": float(total_revenue),
            "cash_sales": float(cash_sales),
            "mpesa_sales": float(mpesa_sales),
            "total_cost": float(total_cost),
            "profit": float(total_revenue - total_cost),
            "items_sold": total_items_sold,
            "number_of_sales": number_of_sales,
            "start_date": start_date.date(),
            "end_date": (end_date - timedelta(days=1)).date(),
            "daily_sales": daily_sales,
        }

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
    def get(self, request):
         # Get the period from query parameters or default to the current year
        s_date = request.query_params.get("start_date")
        e_date = request.query_params.get("end_date")
        start_date = timezone.datetime.strptime(s_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        end_date = timezone.datetime.strptime(e_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        start_datetime = make_aware(datetime.combine(start_date, time.min))  # 00:00:00
        end_datetime = make_aware(datetime.combine( end_date, time.max))

        # Query total sales within the date range
        total_sales_for = Sale.objects.filter(
            created_at__range=[start_datetime, end_datetime]
        ).aggregate(
            total_sales=Sum(F('total') )
        )

        if total_sales_for == None:
            return Response({"total_sales_for_period": 0.0,
                        })
        return Response({"total_sales_for_period": total_sales_for,
                        })


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


class MonthlyProductPerformance(APIView):
    """
    API view to get monthly product performance.
    Endpoint: /api/v1/analytics/monthly-product-sales/
    """
    def get(self, request):
        year = int(request.GET.get('year', datetime.today().year))
        month = int(request.GET.get('month', datetime.today().month))



        start_date = make_aware(datetime(year, month, 1))
        if month == 12:
            end_date = make_aware(datetime(year + 1, 1, 1))
        else:
            end_date = make_aware(datetime(year, month + 1, 1))

        sale_items = SaleItem.objects.filter(
            sale__created_at__gte=start_date,
            sale__created_at__lt=end_date
        ).values('product__name').annotate(
            total_sold=Sum('quantity')
        ).order_by('-total_sold')

        return Response(list(sale_items))




from calendar import month_abbr  # gives ['','Jan','Feb',...,'Dec']

class ProductSalesMonthlyTrend(APIView):
    def get(self, request):
        year = int(request.GET.get('year', datetime.today().year))
        start_date = make_aware(datetime(year, 1, 1))
        end_date = make_aware(datetime(year + 1, 1, 1))

        sale_items = (
            SaleItem.objects
            .filter(sale__created_at__gte=start_date, sale__created_at__lt=end_date)
            .annotate(month=ExtractMonth('sale__created_at'))
            .values('product__name', 'month')
            .annotate(total_sold=Sum('quantity'))
            .order_by('product__name', 'month')
        )

        product_data = defaultdict(lambda: {m: 0 for m in range(1, 13)})

        for item in sale_items:
            product = item['product__name']
            month = item['month']
            total = item['total_sold']
            product_data[product][month] = total

        results = []
        for product, monthly in product_data.items():
            results.append({
                "product": product,
                "monthly_sales": {
                    month_abbr[m]: monthly[m] for m in range(1, 13)
                }
            })

        return Response(results)
