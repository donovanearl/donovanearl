from django.contrib.auth.models import User
from rest_framework import serializers
from .models import AppUser, LandingPage_Content,Cart,Product,CartItems,Order,OrderItems,ContactPage,HardwarePage,SoftwarePage

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser
        fields=('id','name','address','email','phone','created_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username','password')
        extra_kwargs={'password':{'write_only':True}}
    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        return user

class LandingPage_ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model=LandingPage_Content
        fields=('id','contentImage','contentHeader','contentText','created_at')

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields=('user','created_at','updated_at')
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','name','details','price','stock','image','created_at')

class CartItemsSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)

    class Meta:
        model=CartItems
        fields=('id','cart','product','quantity','added_at')
        read_only_fields = ('cart',)


class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Order
        fields=('id','user','status','total_price','stripe_payment_intent_id','created_at')
        read_only_fields=('user',)

class OrderItemsSerializer(serializers.ModelSerializer):
    product =ProductSerializer(read_only=True)   #claude
    class Meta:
        model=OrderItems
        fields=('order','product','quantity','price_at_purchase')
    

#  from claude
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        #add custom claims
        token["username"] = user.username
        return token
    
class ContactPageSerializer(serializers.ModelSerializer):
    class Meta:
        model=ContactPage
        fields=('id','phone','email','location')

class HardwarePageSerializer(serializers.ModelSerializer):
    class Meta:
        model=HardwarePage
        fields=('id','intro_text','service_text','image')

class SoftwarePageSerializer(serializers.ModelSerializer):
    class Meta:
        model=SoftwarePage
        fields=('id','intro_text','service_text','image')