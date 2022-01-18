from rest_framework import mixins, viewsets
from .models import CustomUser
from .serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = CustomUser.objects.all()
