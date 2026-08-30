from django.contrib import admin
from .models import LandingPage_Content,Cart,CartItems,Product,Order,OrderItems,HardwarePage,SoftwarePage,ContactMessage

# Register your models here.
admin.site.register(LandingPage_Content)
admin.site.register(Cart)
admin.site.register(CartItems)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(HardwarePage)
admin.site.register(SoftwarePage)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "channel",
        "email",
        "phone",
        "is_read",
        "created_at",
    )
    list_filter = ("channel", "is_read", "created_at")
    search_fields = ("name", "email", "phone", "message")
    readonly_fields = ("created_at",)
    list_editable = ("is_read",)