from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project
from .models import ToDo


class ProjectSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = ToDo
        exclude = ('is_active',)
