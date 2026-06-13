
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views


urlpatterns = [
    path('user/register/', views.CreateUserView.as_view(),name='register'),
    path('profile/', views.AppUserView.as_view()),
    path('landing-page/',views.LandingPage_ContentView.as_view()),  
    path('token/', views.MyTokenObtainPairView.as_view(),name='get_token'), #Change from Claude
    path('token/refresh/', TokenRefreshView.as_view(),name='refresh'),  
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/items/', views.CartItemsView.as_view(), name='cart-items'),
    path('products/', views.ProductView.as_view(), name='products'),
    path('orders/', views.OrderView.as_view(), name='orders'),
    path('orders/items/', views.OrderItemsView.as_view(), name='order-items'),
    path('cart/items/<int:pk>/', views.CartItemsDetailView.as_view(), name='cart-items-detail'), #from claude
    path('create-payment-intent/',views.create_payment_intent, name='create-payment-intent'),
    path('contact/', views.ContactPageView.as_view(), name='contact'),
    path('/services/hardware/', views.HardwarePageView.as_view(), name='hardware'),
    path('/services/software/', views.SoftwarePageView.as_view(), name='software'),
    ]