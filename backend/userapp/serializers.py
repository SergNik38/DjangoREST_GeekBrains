from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import CustomUser


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "url",
            "username",
            "first_name",
            "last_name",
            "email",
        ]
        # fields = "__all__"


class UserModelSerializerNew(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "url",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_superuser"
        ]
