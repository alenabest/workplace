# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet, DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import OrderingFilter

from workplace.models import Project
from workplace.serializers.project import ProjectSerializer


class ProjectFilter(FilterSet):
    class Meta:
        model = Project
        exclude = ()


class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend)
    filter_class = ProjectFilter
    ordering_fields = {
        'name': 'name'
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
