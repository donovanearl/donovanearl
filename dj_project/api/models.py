from django.db import models
from django.core.validators import RegexValidator , MinLengthValidator

# Create your models here.
class AppUser(models.Model):
    text_only_validator = RegexValidator(r'^[a-zA-Z\s]+$', 'Only text and spaces are allowed.')
    numeric_validator = RegexValidator(r'^\d+$', message='Only digits are allowed.')

    name= models.CharField(max_length=25,validators=[MinLengthValidator(2),text_only_validator])
    address=models.CharField(max_length=50,validators=[MinLengthValidator(5)])
    email=models.EmailField(max_length=50)
    phone=models.CharField(max_length=15,validators=[numeric_validator])
    created_at=models.DateTimeField(auto_now_add=True)

class ProductCard(models.Model):
    numeric_validator = RegexValidator(r'^\d+\.?\d*$', message='Only digits are allowed.')
    
    productName=models.CharField(max_length=25)
    productImage=models.ImageField(blank=True)
    productDetails=models.TextField(max_length=150)
    productPrice=models.CharField(max_length=9,validators=[numeric_validator])
    created_at=models.DateTimeField(auto_now_add=True)


