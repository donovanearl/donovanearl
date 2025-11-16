from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from .models import AppUser,ProductCard
from .serializers import AppUserSerializer,ProductCardSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.

class AppUserView(generics.CreateAPIView):
    queryset=AppUser.objects.all()
    serializer_class=AppUserSerializer

class ProductCardView(generics.ListCreateAPIView):
    queryset=ProductCard.objects.all()
    serializer_class=ProductCardSerializer
    #permission_classes=[IsAuthenticated]

class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
    
