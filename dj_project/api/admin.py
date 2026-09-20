from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import LandingPage_Content,Cart,CartItems,Product,Order,OrderItems,HardwarePage,SoftwarePage,ContactMessage,Appointment,PartSelector,AppUser

# Register your models here.
admin.site.register(LandingPage_Content)
admin.site.register(Cart)
admin.site.register(CartItems)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # columns shown in the list table
    list_display = ("order", "name",
                    "price", "stock", "image_preview")
    # which column(s) are clickable to open the edit page
    list_display_links = ("name",)

    # edit these directly in the list, no need to open each item
    list_editable = ("order", "price")
 
    # search box
    search_fields = ("name", "details")
    ordering = ("order", "id")
    list_per_page = 25

    @admin.display(description="Description")
    def short_intro(self, obj):
        text = obj.intro_text
        return text[:60] + ("…" if len(text) > 60 else "")

    @admin.display(description="Image")
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', obj.image.url)
        return "—"
admin.site.register(Order)
admin.site.register(OrderItems)
@admin.register(HardwarePage)
class HardwarePageAdmin(admin.ModelAdmin):
    # columns shown in the list table
    list_display = ("order", "service_text"
                    , "price", "short_intro", "image_preview")
    # which column(s) are clickable to open the edit page
    list_display_links = ("service_text",)
    # edit these directly in the list, no need to open each item
    list_editable = ("order", "price")
 
    # search box
    search_fields = ("service_text", "intro_text")
    ordering = ("order", "id")
    list_per_page = 25

    @admin.display(description="Description")
    def short_intro(self, obj):
        text = obj.intro_text
        return text[:60] + ("…" if len(text) > 60 else "")

    @admin.display(description="Image")
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', obj.image.url)
        return "—"

@admin.register(SoftwarePage)
class SoftwarePageAdmin(admin.ModelAdmin):
    # columns shown in the list table
    list_display = ("order", "service_text", "price", "short_intro", "image_preview")
    # which column(s) are clickable to open the edit page
    list_display_links = ("service_text",)
    # edit these directly in the list, no need to open each item
    list_editable = ("order", "price")
 
    # search box
    search_fields = ("service_text", "intro_text")
    ordering = ("order", "id")
    list_per_page = 25

    @admin.display(description="Description")
    def short_intro(self, obj):
        text = obj.intro_text
        return text[:60] + ("…" if len(text) > 60 else "")

    @admin.display(description="Image")
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', obj.image.url)
        return "—"

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

@admin.register(PartSelector)
class PartSelectorAdmin(admin.ModelAdmin):
    list_display = (
        'type',
        'name',
        'socket',
        'price',
        'updated_at'
    )
    list_filter = ('type', 'socket','updated_at')
    search_fields = ('name', 'socket')
    ordering = ('type', 'name')
    list_editable = ('price',)

    fieldsets = (
        ('Classification', {
            'fields': ('type', 'socket'),
        }),
        ('Part', {
            'fields': ('name', 'price'),
        }),
    )


class AppUserInline(admin.StackedInline):
    model = AppUser
    can_delete = False
    verbose_name_plural = "Profile"


class CustomUserAdmin(UserAdmin):
    inlines = (AppUserInline,)
    list_display = ("username", "email", "is_staff", "date_joined")


# Unregister the default User admin, register our customized one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ("user", "name", "email", "phone", "created_at")
    search_fields = ("name", "email", "phone", "user__username")