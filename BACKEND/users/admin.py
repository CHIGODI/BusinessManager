from django.contrib import admin
from .models import CustomUser

# Registering the models with the admin site
admin.site.register(CustomUser)
