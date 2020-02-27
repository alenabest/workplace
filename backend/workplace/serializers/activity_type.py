# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import ActivityType


class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        exclude = ()


class ActivityTypeRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = ActivityType
        model_serializer_class = ActivityTypeSerializer
