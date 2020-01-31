# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import timedelta, datetime

from django.http import JsonResponse
from django_filters.rest_framework import FilterSet
from rest_framework import generics
from rest_framework.decorators import api_view

from workplace.models import Activity
from workplace.serializers.activity import ActivitySerializer


class ActivityFilter(FilterSet):
    class Meta:
        model = Activity
        exclude = ()


class ActivityList(generics.ListCreateAPIView):
    queryset = Activity.objects.all().order_by('activityDate', 'start')
    serializer_class = ActivitySerializer
    filter_class = ActivityFilter

    def perform_create(self, serializer):
        data = dict(user=self.request.user)
        data.update(calculate_params(self.request.data))
        serializer.save(**data)


class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def perform_update(self, serializer):
        data = dict()
        data.update(calculate_params(self.request.data))
        serializer.save(**data)


@api_view(['POST'])
def get_week_activity(request):
    user = request.data.get('user')
    monday = request.data.get('monday')
    sunday = request.data.get('sunday')
    activities = Activity.objects.filter(user=user, activityDate__gte=monday, activityDate__lte=sunday)
    date_list = get_date_list(monday)
    week_activity_list = get_week_activity_list(activities, date_list)
    return JsonResponse({'results': week_activity_list})


def get_week_activity_list(activities, date_list):
    week_activity_list = list()
    for date_item in date_list:
        day_activities = activities.filter(activityDate=date_item).all().order_by('start')
        week_activity_list.append({
            'day': date_list.index(date_item),
            'activities': ActivitySerializer(day_activities, many=True).data
        })
    return week_activity_list


def get_date_list(monday):
    date_list = list()
    for index in range(7):
        new_date = datetime.strptime(monday, '%Y-%m-%d') + timedelta(days=index)
        date_list.append(new_date.date())
    return date_list


@api_view(['POST'])
def validate_activity(request):
    user = request.user
    activity_date = request.data.get('activityDate')
    start = request.data.get('start')
    end = request.data.get('end')
    activity_id = request.data.get('id', None)
    activities = Activity.objects.filter(user=user, activityDate=activity_date).exclude(id=activity_id)
    previous_activity = activities.filter(end__gt=start, start__lte=start).first()
    next_activity = activities.filter(start__lt=end, end__gte=end).first()
    if previous_activity or next_activity:
        response = get_response(previous_activity, next_activity)
    else:
        response = {"ok": True}
    return JsonResponse(response)


def get_response(previous_activity, next_activity):
    return {
        'start': previous_activity.end if previous_activity else None,
        'end': next_activity.start if next_activity else None
    }


def calculate_params(request_data):
    data = dict()
    start = request_data.get('start', None)
    end = request_data.get('end', None)
    [start_hour, start_minutes] = get_hour_and_minutes(start)
    [end_hour, end_minutes] = get_hour_and_minutes(end)
    height = get_height(start_hour, end_hour, start_minutes, end_minutes)
    data.update(dict(
        startHour=start_hour, startMinute=start_minutes, endHour=end_hour, endMinute=end_minutes, height=height
    ))

    return data


def get_height(start_hour, end_hour, start_minutes, end_minutes):
    hours = end_hour - start_hour
    minutes = end_minutes - start_minutes
    return '%spx' % (hours * 60 + minutes)


def get_hour_and_minutes(time_string):
    return list(map(int, time_string.split(':')))
