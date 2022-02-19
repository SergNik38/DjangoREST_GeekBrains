import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from todoapp.views import ProjectViewSet
from todoapp.models import ToDo
from userapp.models import CustomUser


class TestProjectViewSet(TestCase):

    def test_get_list_without_auth(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestToDoViewSet(APITestCase):

    def test_get_detail(self):
        todo = mixer.blend(ToDo, text='TEST TEXT')
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['text'], 'TEST TEXT')
