from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from uuid import uuid4

from django.db.models.fields import UUIDField


class CustomUser(AbstractUser, UserManager):
    uuid = UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(unique=True)

    class Meta:
        ordering = ['uuid']
