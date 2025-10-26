from django.contrib.auth.models import User
from rest_framework import serializers
from .models import AppUser, ProductCard

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

