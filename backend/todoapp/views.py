from email.policy import default
from http import server
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, ToDoSerializer
from .models import Project, ToDo
from .filters import ProjectFilter, ToDoFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import mixins, viewsets, permissions


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination
    permission_classes = [permissions.AllowAny]


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination
    # permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        """Получились какие-то дикие костыли (но работают), 
        но ничего лучше придумать пока не смог"""
        instance = self.get_object()
        self.active_toggle(instance)
        ser = self.get_serializer(instance).data
        serializer = self.get_serializer(instance, data=ser)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def active_toggle(self, instance):
        instance.is_active = False
