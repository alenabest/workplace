# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse
from django_filters.rest_framework import FilterSet, DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from workplace.models import User
from workplace.serializers.user import UserSerializer, UserListSerializer


class UserFilter(FilterSet):
    class Meta:
        model = User
        exclude = ('password', 'avatar')


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    filter_class = UserFilter
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ('last_name', 'first_name', 'middle_name')


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
def get_user_profile(request):
    user = User.objects.filter(id=request.user.id).first()
    return JsonResponse(UserSerializer(user).data)


@api_view(['POST'])
def change_password(request):
    user = request.user
    old_password = request.data.get('oldPassword', '')
    new_password = request.data.get('newPassword', '')

    if user.check_password(old_password):
        user.set_password(new_password)
        user.save()
    else:
        return Response({'messages': ['Неверный пароль']}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    return JsonResponse({"ok": True})


@api_view(['POST'])
def upload_avatar(request, pk):
    attachment = request.FILES.get('file')

    messages = []
    if not attachment:
        messages += ['Файл не задан']

    if messages:
        return Response(data={'messages': messages}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(pk=pk).first()
    if not user:
        return Response(data={'messages': ['Пользователь с заданным pk не найден в базе']},
                        status=status.HTTP_404_NOT_FOUND)

    user.avatar = attachment
    user.save()

    return JsonResponse({"avatar": user.avatar.url})
