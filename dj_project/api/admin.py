from django.contrib import admin
from django.utils.html import format_html
from .models import LandingPage_Content,Cart,CartItems,Product,Order,OrderItems,HardwarePage,SoftwarePage,ContactMessage,Appointment

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

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'phone',
        'email',
        'service',
        'status',
        'amount_paid',
        'created_at',
    )
    list_filter = ('status', 'created_at', 'service')
    search_fields = ('name', 'phone', 'email', 'service', 'notes')
    list_editable = ('status',)
    readonly_fields = ('created_at', 'updated_at', 'paid_at','status_badge',)

    fieldsets = (
        ('Customer Info', {
            'fields': ('name', 'phone', 'email'),
        }),
        ('Appointment Details', {
            'fields': ('service', 'preferred_time', 'notes'),
        }),
        ('Status & Payment', {
            'fields': ('status', 'amount_paid', 'paid_at'),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    def status_badge(self, obj):
        colors = {
            'pending': '#f0ad4e',
            'done': '#5cb85c',
            'cancelled': '#d9534f',
            'paid': '#0275d8',
        }
        color = colors.get(obj.status, '#777')
        return format_html(
            '<span style="background:{}; color:white; padding:3px 8px; border-radius:4px;">{}</span>',
            color,
            obj.get_status_display(),
        )
    status_badge.short_description = 'Status'