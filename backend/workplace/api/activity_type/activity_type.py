# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Q
from django_filters.rest_framework import FilterSet, CharFilter, DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter

from workplace.models import ActivityType
from workplace.serializers.activity_type import ActivityTypeSerializer


class ActivityTypeFilter(FilterSet):
    projects = CharFilter(method='filter_projects')
    directions = CharFilter(method='filter_directions')

    @staticmethod
    def filter_projects(qs, name, value):
        return qs.filter(Q(direction__project=value) | Q(direction__project=None))

    @staticmethod
    def filter_directions(qs, name, value):
        return qs.filter(Q(direction=value) | Q(direction=None))

    class Meta:
        model = ActivityType
        exclude = ()


class ActivityTypeList(generics.ListCreateAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend, SearchFilter)
    filter_class = ActivityTypeFilter
    search_fields = ('name', )
    ordering_fields = {'name': 'name'}

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ActivityTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
