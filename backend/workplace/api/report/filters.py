# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet

from workplace.models import Report


class ReportFilterSet(FilterSet):
    class Meta:
        model = Report
        exclude = ('link',)
