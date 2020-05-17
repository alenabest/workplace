# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Direction


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        exclude = ()


class DirectionRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Direction
        model_serializer_class = DirectionSerializer
