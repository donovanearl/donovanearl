from django.contrib.auth.models import User
from rest_framework import generics
from .models import AppUser,LandingPage_Content,Cart,CartItems,Product,Order,OrderItems,HardwarePage,SoftwarePage,ContactMessage,Appointment
from .serializers import (AppUserSerializer,UserSerializer, LandingPage_ContentSerializer,
                          MyTokenObtainPairSerializer,CartSerializer,CartItemsSerializer,ProductSerializer,
                          OrderSerializer,OrderItemsSerializer,HardwarePageSerializer,SoftwarePageSerializer,ContactMessageSerializer,AppointmentSerializer)
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
import stripe
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db import transaction
from django.conf import settings
from django.core.mail import send_mail
from .tasks import send_contact_notification

# Create your views here.

class AppUserView(generics.RetrieveUpdateAPIView):
    serializer_class=AppUserSerializer
    permission_classes=[IsAuthenticated]
    
    def get_object(self):
        return AppUser.objects.get(user=self.request.user)


class LandingPage_ContentView(generics.ListCreateAPIView):
    queryset=LandingPage_Content.objects.all()
    serializer_class=LandingPage_ContentSerializer
    permission_classes=[AllowAny]

class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

    def perform_create(self, serializer):
        user=serializer.save()
        Cart.objects.create(user=user)  #cart created after user registers
        AppUser.objects.create(user=user) #auto create an empty profile

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

class CartView(generics.ListCreateAPIView):
    # queryset=Cart.objects.all()
    serializer_class=CartSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

class CartItemsView(generics.ListCreateAPIView):

    serializer_class=CartItemsSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return CartItems.objects.filter(cart__user=self.request.user)
    
    def perform_create(self, serializer):
        cart=Cart.objects.get(user=self.request.user)
        product_id = self.request.data.get('product')
        product = Product.objects.get(id=product_id)
        
        existing = CartItems.objects.filter(cart=cart, product=product).first()
        if existing:
            existing.quantity += 1  # 👈 increment instead of duplicate / Claude
            existing.save()
            return
    
        serializer.save(cart=cart,product=product)

class CartItemsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=CartItemsSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return CartItems.objects.filter(cart__user=self.request.user)

class ProductView(generics.ListCreateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    permission_classes=[AllowAny]

class OrderView(generics.ListCreateAPIView):
    
    serializer_class=OrderSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderItemsView(generics.ListCreateAPIView):
    
    serializer_class=OrderItemsSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return OrderItems.objects.filter(order__user=self.request.user)
    
    def perform_create(self, serializer):
        product_id = self.request.data.get('product')
        product = Product.objects.get(id=product_id)
        serializer.save(product=product)

class HardwarePageView(generics.ListAPIView):
    serializer_class=HardwarePageSerializer
    permission_classes=[AllowAny]
    queryset=HardwarePage.objects.all()

class SoftwarePageView(generics.ListAPIView):
    serializer_class=SoftwarePageSerializer
    permission_classes=[AllowAny]
    queryset=SoftwarePage.objects.all()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    try:
        amount= request.data.get('amount')
        intent= stripe.PaymentIntent.create(
            amount=int(float(amount)*100), ## stripe uses cents
            currency='aed',
        )
        return Response({'client_secret':intent.client_secret})
    except Exception as e:
        return Response({'error':str(e)} , status=400)

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    authentication_classes = []  # no session → no CSRF on this endpoint

    def perform_create(self, serializer):
        message = serializer.save()
        transaction.on_commit(
            lambda: send_contact_notification.enqueue(message.id)
        )

class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]
    authentication_classes = []   # important: disables CSRF on this endpoint

    def perform_create(self, serializer):
        appointment = serializer.save()

        subject = f'New Appointment Request – {appointment.name}'
        body = (
            'New appointment request:\n\n'
            f'Name: {appointment.name}\n'
            f'Phone: {appointment.phone}\n'
            f'Email: {appointment.email}\n'
            f'Service: {appointment.service}\n'
            f'Preferred time: {appointment.preferred_time or "Not specified"}\n'
            f'Notes: {appointment.notes or "None"}\n'
        )

        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NOTIFY_EMAIL],
            fail_silently=False,
        )