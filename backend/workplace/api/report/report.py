# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import datetime, timedelta

from django.db.models import Sum
from django.http import JsonResponse
from django_filters.rest_framework import FilterSet
from rest_framework import generics
from rest_framework.decorators import api_view

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


def get_duration(duration):
    if duration:
        duration = int(duration)
        hours = float(duration / 60)
        return f"{hours:.2f}"
    else:
        return 0


def get_date_list(start, end):
    start_day = datetime.strptime(start, '%Y-%m-%d')
    end_day = datetime.strptime(end, '%Y-%m-%d')
    date_list = []
    new_date = start_day
    for index in range(start_day.day, end_day.day + 1):
        date_list.append({'day': new_date.day, 'date': new_date.date()})
        new_date = new_date + timedelta(days=1)
    return date_list


def get_days(types, start, end, activity_type):
    day_list = get_date_list(start, end)
    items = []
    for day in day_list:
        duration = types.filter(activityDate=day.get('date'), type=activity_type).aggregate(Sum('duration'))
        item = {
            'day': day.get('day'),
            'duration': get_duration(duration.get('duration__sum'))
        }
        items.append(item)
    return items


def get_types(types, start, end):
    items = []
    for activity_type in types:
        item = {
            'direction': activity_type.get('type__name', ''),
            'days': get_days(types, start, end, activity_type.get('type', None))
        }
        items.append(item)
    return items


def get_directions(directions, start, end):
    items = []
    for direction in directions:
        types = directions.filter(direction=direction.get('direction', None))\
            .values('type', 'type__name').annotate(minutes=Sum('duration')).order_by('type__name')
        item = {
            'direction': direction.get('direction__name', ''),
            'types': get_types(types, start, end)
        }
        items.append(item)
    return items


def get_items_for_report(activities, start, end):
    projects = activities \
        .values('project', 'project__name').annotate(minutes=Sum('duration'))
    items = []
    for project in projects:
        directions = activities.filter(project=project.get('project', None)) \
            .values('direction', 'direction__name').annotate(minutes=Sum('duration')).order_by('direction__name')
        item = {
            'project': project.get('project__name', ''),
            'directions': get_directions(directions, start, end)
        }
        items.append(item)
    return items


def create_excel_report(activities, start, end):
    items = get_items_for_report(activities, start, end)
    print(items)


def create_doc_report(activities):
    groups = activities.values('project__name', 'direction__name', 'activityDate').annotate(minutes=Sum('duration'))
    for group in groups:
        group.append({'asdasd': 'asdasd'})
        print(group)


@celery_app.task
def create_report(user_id, report_id, report_type, start, end):
    report = Report.objects.get(id=report_id)
    try:
        activities = Activity.objects.filter(user_id=user_id, activityDate__gte=start, activityDate__lte=end)\
            .order_by('project__name')
        if report_type == 0 or report_type == 2:
            create_excel_report(activities, start, end)
        else:
            create_doc_report(activities)
        report.state = 1
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
    create_report.delay(user_id, report.id, report_type, start, end)

    return JsonResponse({'ok': True})
