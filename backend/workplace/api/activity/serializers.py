# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Activity, Project, Direction, ActivityType


class ProjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name')


class ProjectShortRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Project
        model_serializer_class = ProjectShortSerializer


class DirectionShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ('id', 'name')


class DirectionShortRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Direction
        model_serializer_class = DirectionShortSerializer


class ActivityTypeShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = ('id', 'name')


class ActivityTypeShortRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = ActivityType
        model_serializer_class = ActivityTypeShortSerializer


class ActivitySerializer(serializers.ModelSerializer):
    project = ProjectShortRelatedSerializer(queryset=Project.objects.all(), many=False, required=False, allow_null=True)
    direction = DirectionShortRelatedSerializer(queryset=Direction.objects.all(), many=False, required=False,
                                                allow_null=True)
    type = ActivityTypeShortRelatedSerializer(queryset=ActivityType.objects.all(), many=False, required=False,
                                              allow_null=True)

    class Meta:
        model = Activity
        exclude = ()


class ActivityRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Activity
        model_serializer_class = ActivitySerializer
