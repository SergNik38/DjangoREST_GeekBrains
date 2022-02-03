import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import CustomUser


class TestUserViewSet(TestCase):

    def test_get_detail(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        response = client.get(f'/api/users/{user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
