from django.contrib import admin
from .models import LandingPage_Content,Cart,CartItems,Product,Order,OrderItems,ContactPage

# Register your models here.
admin.site.register(LandingPage_Content)
admin.site.register(Cart)
admin.site.register(CartItems)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(ContactPage)