from django.db import models
from django.contrib.auth.models import User
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

    def __str__(self):
        return f"Product: {self.productName}" f" ID: {self.pk}"

    #author=models.ForeignKey(User,on_delete=models.CASCADE, related_name="product")
class LandingPage_Content(models.Model):
    contentImage=models.ImageField(blank=True)
    contentHeader=models.CharField(max_length=35)
    contentText=models.TextField(max_length=250)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Product: {self.contentHeader}" f" ID: {self.pk}"

   


