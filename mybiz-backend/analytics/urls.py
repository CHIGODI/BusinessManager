from django.urls import path
from .views import ProductAnalyticsView, SalesForPeriodView, ProductsBelowThresholdView

urlpatterns = [
    path("products/", ProductAnalyticsView.as_view(), name="product-analytics"),
    path("products/low-stock/", ProductsBelowThresholdView.as_view(), name="product-analytics-low-stock"),
    path("sales/", SalesForPeriodView.as_view(), name="sales-for-period"),
]
