from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from .models import AppUser,LaptopsCard,LandingPage_Content
from .serializers import AppUserSerializer,LaptopsCardSerializer,UserSerializer, LandingPage_ContentSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.

class AppUserView(generics.CreateAPIView):
    queryset=AppUser.objects.all()
    serializer_class=AppUserSerializer

class LaptopsCardView(generics.ListCreateAPIView):
    queryset=LaptopsCard.objects.all()
    serializer_class=LaptopsCardSerializer
    permission_classes=[AllowAny]

class LandingPage_ContentView(generics.ListCreateAPIView):
    queryset=LandingPage_Content.objects.all()
    serializer_class=LandingPage_ContentSerializer
    permission_classes=[AllowAny]

class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
    
