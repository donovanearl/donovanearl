from django.contrib import admin
from .models import LandingPage_Content,Cart,CartItems

# Register your models here.
admin.site.register(LandingPage_Content)
admin.site.register(Cart)
admin.site.register(CartItems)