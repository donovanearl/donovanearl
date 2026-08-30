from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django_tasks import task
from django.utils import timezone

from .models import ContactMessage

MAX_ATTEMPTS = 3


@task
def send_contact_notification(message_id: int, attempt: int = 1) -> None:
    try:
        message = ContactMessage.objects.get(pk=message_id)
    except ContactMessage.DoesNotExist:
        return

    subject = f"New {message.get_channel_display()} message from {message.name}"
    body = (
        "New contact message received:\n\n"
        f"Name: {message.name}\n"
        f"Channel: {message.get_channel_display()}\n"
        f"Email: {message.email or '—'}\n"
        f"Phone: {message.phone or '—'}\n\n"
        f"Message:\n{message.message}\n\n"
        "-----------------------------\n"
        f"View in admin: {settings.SITE_URL}"
        f"/admin/api/contactmessage/{message.id}/change/"
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NOTIFY_EMAIL],
            fail_silently=False,
        )
    except Exception:
        if attempt >= MAX_ATTEMPTS:
            raise
        send_contact_notification.using(
            run_after=timezone.now() + timedelta(minutes=attempt)
        ).enqueue(message_id, attempt + 1)
        raise