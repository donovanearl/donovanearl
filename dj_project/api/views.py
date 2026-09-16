from django.contrib.auth.models import User
from rest_framework import generics
from .models import AppUser,LandingPage_Content,Cart,CartItems,Product,Order,OrderItems,HardwarePage,SoftwarePage,ContactMessage,Appointment,PartSelector
from .serializers import (AppUserSerializer,UserSerializer, LandingPage_ContentSerializer,
                          MyTokenObtainPairSerializer,CartSerializer,CartItemsSerializer,ProductSerializer,
                          OrderSerializer,OrderItemsSerializer,HardwarePageSerializer,SoftwarePageSerializer,ContactMessageSerializer,AppointmentSerializer,PartSelectorSerializer)
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
import stripe
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db import transaction
from django.conf import settings
from django.core.mail import send_mail
from .tasks import send_contact_notification
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

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
        AppUser.objects.create(user=user ,
                                name=self.request.data.get('userprofilename', ''),
                                address=self.request.data.get('useraddress', ''),
                                email=self.request.data.get('useremail', ''),
                                phone=self.request.data.get('usermobile', '')) #auto create a profile

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

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_payment_intent(request):
#     try:
#         amount= request.data.get('amount')
#         intent= stripe.PaymentIntent.create(
#             amount=int(float(amount)*100), ## stripe uses cents
#             currency='aed',
#         )
#         return Response({'client_secret':intent.client_secret})
#     except Exception as e:
#         return Response({'error':str(e)} , status=400)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    try:
        amount = request.data.get('amount')

        cart = Cart.objects.get(user=request.user)
        cart_items = CartItems.objects.filter(cart=cart)

        if not cart_items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                status="pending",
                total_price=float(amount),
            )

            for item in cart_items:
                OrderItems.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price_at_purchase=item.product.price,
                )

            intent = stripe.PaymentIntent.create(
                amount=int(float(amount) * 100),
                currency='aed',
                metadata={'order_id': order.id, 'user_id': request.user.id},
            )

            order.stripe_payment_intent_id = intent.id
            order.save()

        return Response({'client_secret': intent.client_secret, 'order_id': order.id})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        return HttpResponse(status=400)

    if event['type'] == 'payment_intent.succeeded':
        intent = event['data']['object']
        try:
            order = Order.objects.get(stripe_payment_intent_id=intent['id'])
            if order.status != "paid":
                order.status = "paid"
                order.save()
                CartItems.objects.filter(cart__user=order.user).delete()
        except Order.DoesNotExist:
            pass

    elif event['type'] == 'payment_intent.payment_failed':
        intent = event['data']['object']
        try:
            order = Order.objects.get(stripe_payment_intent_id=intent['id'])
            order.status = "failed"
            order.save()
        except Order.DoesNotExist:
            pass

    return HttpResponse(status=200)

#  TODO change here-------------------------------

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
class PartSelectorView(generics.ListCreateAPIView):
    queryset=PartSelector.objects.all()
    serializer_class=PartSelectorSerializer
    permission_classes=[AllowAny]