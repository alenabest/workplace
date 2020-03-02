# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet
from rest_framework import generics

from workplace.models import Role
from workplace.serializers.role import RoleSerializer


class RoleFilter(FilterSet):
    class Meta:
        model = Role
        exclude = ()


class RoleList(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    filter_class = RoleFilter


class RoleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
