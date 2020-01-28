# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        exclude = ()


class ActivityRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Activity
        model_serializer_class = ActivitySerializer
