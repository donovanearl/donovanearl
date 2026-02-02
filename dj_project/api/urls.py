from django.contrib import admin
from django.urls import path , include
from .views import AppUserView, LaptopsCardView , LandingPage_ContentView


urlpatterns = [
    path('user', AppUserView.as_view()),
    path('laptops', LaptopsCardView.as_view()),
    path('landing-page',LandingPage_ContentView.as_view())
    ]