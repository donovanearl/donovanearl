from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator , MinLengthValidator

# Create your models here.
class AppUser(models.Model):
    text_only_validator = RegexValidator(r'^[a-zA-Z\s]+$', 'Only text and spaces are allowed.')
    numeric_validator = RegexValidator(r'^\d+$', message='Only digits are allowed.')

    user= models.OneToOneField(User,on_delete=models.CASCADE, related_name="profile")  #connects with auth user
    name= models.CharField(max_length=25,validators=[MinLengthValidator(2),text_only_validator])
    address=models.CharField(max_length=50,validators=[MinLengthValidator(5)])
    email=models.EmailField(max_length=50)
    phone=models.CharField(max_length=15,validators=[numeric_validator])
    created_at=models.DateTimeField(auto_now_add=True)


    #author=models.ForeignKey(User,on_delete=models.CASCADE, related_name="product")
class LandingPage_Content(models.Model):
    contentImage=models.ImageField(blank=True)
    contentHeader=models.CharField(max_length=35)
    contentText=models.TextField(max_length=250)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Product: {self.contentHeader}" f" ID: {self.pk}"

class Cart(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart: {self.user.username}"

class Product(models.Model):

    name=models.CharField(max_length=30 )
    details=models.TextField(max_length=250)
    price=models.DecimalField(max_digits=9, decimal_places=2)
    stock=models.IntegerField()
    image = models.ImageField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Product:{self.name} ID:{self.pk}"

class CartItems(models.Model):

    cart=models.ForeignKey(Cart,on_delete=models.CASCADE, related_name="cart_items")
    product=models.ForeignKey(Product,on_delete=models.CASCADE, related_name="product_cart_items")
    quantity=models.IntegerField()
    added_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name}x{self.quantity}"
    

class Order(models.Model):
    text_only_validator = RegexValidator(r'^[a-zA-Z\s]+$', 'Only text and spaces are allowed.')
   
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="order")
    status=models.CharField(max_length=10, validators=[text_only_validator])
    total_price=models.FloatField()
    stripe_payment_intent_id=models.CharField(max_length=255, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order:{self.user.username} ID:{self.pk}"

class OrderItems(models.Model):
 
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="order_items")
    product=models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_order_items")
    quantity=models.IntegerField()
    price_at_purchase=models.FloatField()

class ContactPage(models.Model):

    phone=models.CharField(max_length=11)
    email=models.CharField(max_length=50)
    location=models.ImageField(blank=True)





