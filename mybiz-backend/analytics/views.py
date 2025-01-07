from products.models import Product
from sales.models import Sale
from sales.models import SaleItem
from rest_framework import APIView
from django.db.models import Sum
from django.db.models.functions import TruncDate
from rest_framework.response import Response


#filter sales by date
#list of products below low_stock_threshold (new order)
#best moving products based on (weekly/monthly) sales
#total sales for a given period
#profit for a given period

