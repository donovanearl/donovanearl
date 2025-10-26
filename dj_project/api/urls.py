from django.contrib import admin
from django.urls import path , include
from .views import AppUserView, ProductCardView


urlpatterns = [
    path('user', AppUserView.as_view()),
    path('product', ProductCardView.as_view())
    ]