# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from django.db.models import Sum
from django.http import JsonResponse
from django_filters.rest_framework import FilterSet
from rest_framework import generics
from rest_framework.decorators import api_view

from workplace.api.report.create_excel_month_report import create_excel_month_report
from workplace.common.utils import get_date_list, convert_minutes_to_hour
from workplace.models import Report, Activity
from workplace.celery import app as celery_app
from workplace.serializers.report import ReportSerializer


class ReportFilter(FilterSet):
    class Meta:
        model = Report
        exclude = ('link',)


class ReportList(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    filter_class = ReportFilter


class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


def get_days(types, start, end, activity_type):
    day_list = get_date_list(start, end)
    items = []
    for day in day_list:
        duration = types.filter(activityDate=day.get('date'), type=activity_type).aggregate(Sum('duration'))
        item = {
            'day': day.get('day'),
            'weekend': day.get('weekend'),
            'duration': convert_minutes_to_hour(duration.get('duration__sum'))
        }
        items.append(item)
    return items


def get_types(types, start, end):
    items = []
    for activity_type in types:
        item = {
            'type': activity_type.get('type__name'),
            'days': get_days(types, start, end, activity_type.get('type', None))
        }
        if item.get('type') is None:
            item.update(type='Без вида работы')
        items.append(item)
    return items


def get_directions(directions, start, end):
    items = []
    for direction in directions:
        types = directions.filter(direction=direction.get('direction', None)) \
            .values('type', 'type__name').annotate(minutes=Sum('duration')).order_by('type__name')
        item = {
            'direction': direction.get('direction__name'),
            'types': get_types(types, start, end),
            'rows': types.count()
        }
        if item.get('direction') is None:
            item.update(direction='Без направления')
        items.append(item)
    return items


def get_rows_for_project(directions):
    rows = 0

    for direction in directions:
        rows += direction.get('rows', 1)

    return rows


def get_items_for_report(activities, start, end):
    projects = activities \
        .values('project', 'project__name').annotate(minutes=Sum('duration'))
    items = []
    for project in projects:
        directions = activities.filter(project=project.get('project', None)) \
            .values('direction', 'direction__name').annotate(minutes=Sum('duration')).order_by('direction__name')
        item = {
            'project': project.get('project__name'),
            'directions': get_directions(directions, start, end),
            'rows': 1
        }
        item.update(rows=get_rows_for_project(item.get('directions', [])))
        if item.get('project') is None:
            item.update(project='Без проекта')
        items.append(item)
    return items


def create_excel_report(activities, start, end, user_id, report_id):
    items = get_items_for_report(activities, start, end)
    return create_excel_month_report(activities, items, start, end, user_id, report_id)


def create_doc_report(activities):
    groups = activities.values('project__name', 'direction__name', 'activityDate').annotate(minutes=Sum('duration'))
    for group in groups:
        print(group)

    return 'Ссылка на файл'


@celery_app.task
def create_report(user_id, report_id, report_type, start, end):
    report = Report.objects.get(id=report_id)
    try:
        activities = Activity.objects.filter(user_id=user_id, activityDate__gte=start, activityDate__lte=end) \
            .order_by('project__name')
        if report_type == 0 or report_type == 2:
            link = create_excel_report(activities, start, end, user_id, report_id)
        else:
            link = create_doc_report(activities)
        report.state = 1
        report.link = link
        report.generated = start
        report.save()
    except Exception as e:
        report.state = 2
        report.save()
        print(e)


@api_view(['POST'])
def generate_report(request):
    user_id = request.user.id
    report_type = request.data.get('type')
    start = request.data.get('start')
    end = request.data.get('end')
    report = Report.objects.get_or_create(user_id=user_id, type=report_type)[0]
    if report:
        Report.objects.get(id=report.id)
        report.state = 0
        report.link = ''
        report.save()

    create_report.delay(user_id, report.id, report_type, start, end)

    return JsonResponse({'ok': True})
