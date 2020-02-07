# -*- coding: utf-8 -*-
from __future__ import unicode_literals

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


def create_excel_report(activities):
    groups = activities.values('project__name', 'direction__name', 'type__name', 'activityDate').\
        annotate(minutes=Sum('duration'))
    for group in groups:
        print(group)


def create_doc_report(activities):
    groups = activities.values('project__name', 'direction__name', 'activityDate').annotate(minutes=Sum('duration'))
    for group in groups:
        print(group)


@celery_app.task
def create_report(user_id, report_id, report_type, start, end):
    print(user_id, report_id, report_type, start, end)
    report = Report.objects.get(id=report_id)
    try:
        activities = Activity.objects.filter(user_id=user_id, activityDate__gte=start, activityDate__lte=end)\
            .order_by('activityDate')
        if report_type == 0 or report_type == 2:
            create_excel_report(activities)
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
