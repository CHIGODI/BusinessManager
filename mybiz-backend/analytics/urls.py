from django.urls import path
from .views import ProductAnalyticsView, SalesForPeriodView, ProductsBelowThresholdView, PerformanceSummary

urlpatterns = [
    path("products/", ProductAnalyticsView.as_view(), name="product-analytics"),
    path("sales/", SalesForPeriodView.as_view(), name="sales-for-period"),
    path("products/low-stock/", ProductsBelowThresholdView.as_view(), name="product-analytics-low-stock"),
    path("performance/summary/", PerformanceSummary.as_view(), name="product-analytics-summary"),

]
