from django.contrib.auth.models import User
from rest_framework import serializers
from .models import AppUser, ProductCard
from .models import LandingPage_Content

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser
        fields=('id','name','address','email','phone','created_at')

class ProductCardSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductCard
        fields=('id','productName','productImage','productDetails','productPrice','created_at')

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
 
