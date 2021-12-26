from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

from django.db.models.fields import UUIDField


class CustomUser(AbstractUser):
    uuid = UUIDField(primary_key=True)
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
