# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Q
from django_filters.rest_framework import FilterSet, DjangoFilterBackend, CharFilter
from rest_framework import generics
from rest_framework.filters import OrderingFilter

from workplace.models import Direction
from workplace.serializers.direction import DirectionSerializer


class DirectionFilter(FilterSet):
    projects = CharFilter(method='filter_projects')

    @staticmethod
    def filter_projects(qs, name, value):
        return qs.filter(Q(project=value) | Q(project=None))

    class Meta:
        model = Direction
        exclude = ()


class DirectionList(generics.ListCreateAPIView):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend)
    filter_class = DirectionFilter
    ordering_fields = {
        'name': 'name'
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DirectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
