# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet
from rest_framework import generics

from workplace.models import Activity
from workplace.serializers.activity import ActivitySerializer


class ActivityFilter(FilterSet):
    class Meta:
        model = Activity
        exclude = ()


class ActivityList(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_class = ActivityFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
