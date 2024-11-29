"""This module contains the tests for the core app"""
from django.test import TestCase
from .models import BaseModel


class TestCoreModels(TestCase):
    """Test the core models"""
    def setUp(self):
        base = BaseModel.objects.create()

    def test_instance_creation(self):
        """Test that MyModel instance is created correctly"""
        base_instance = BaseModel.objects.get()
        print(base_instance)

