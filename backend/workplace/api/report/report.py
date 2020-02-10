# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import datetime, timedelta

import xlsxwriter as xlsxwriter
from django.db.models import Sum
from django.http import JsonResponse
from django_filters.rest_framework import FilterSet
from rest_framework import generics
from rest_framework.decorators import api_view

from workplace.models import Report, Activity, User
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
        return f"{hours:.1f}"
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
            'type': activity_type.get('type__name', ''),
            'days': get_days(types, start, end, activity_type.get('type', None))
        }
        items.append(item)
    return items


def get_directions(directions, start, end):
    items = []
    for direction in directions:
        types = directions.filter(direction=direction.get('direction', None)) \
            .values('type', 'type__name').annotate(minutes=Sum('duration')).order_by('type__name')
        item = {
            'direction': direction.get('direction__name', ''),
            'types': get_types(types, start, end),
            'rows': types.count()
        }
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
            'project': project.get('project__name', ''),
            'directions': get_directions(directions, start, end),
            'rows': 1
        }
        item.update(rows=get_rows_for_project(item.get('directions', [])))
        items.append(item)
    return items


def get_document_date(date):
    months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
              'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    new_date = datetime.strptime(date, '%Y-%m-%d')
    year = new_date.year
    month = months[new_date.month - 1]
    return [month, year]


def get_cell_format(workbook):
    cell_format = workbook.add_format()
    cell_format.set_font_size(11)
    cell_format.set_align('center')
    cell_format.set_align('vcenter')
    cell_format.set_font('Calibri')
    cell_format.set_border()
    return cell_format


def create_excel_document(items, start, end, user_id, report_id):
    user = User.objects.get(id=user_id)
    day_count = len(get_date_list(start, end))
    [month, year] = get_document_date(start)
    string_date = '%s %s' % (month, year)
    [last_name, first_name] = [user.last_name, user.first_name]
    document_name = '%s %s - отчет за %s.xlsx' % (last_name, first_name, string_date)
    workbook = xlsxwriter.Workbook(document_name)
    worksheet = workbook.add_worksheet('Отчёт за месяц')
    cell_format = get_cell_format(workbook)
    worksheet.set_default_row(25)
    worksheet.set_column(0, 0, 3)
    worksheet.set_column(1, 3, 25)
    worksheet.set_column(4, day_count + 3, 3)
    worksheet.set_column(day_count + 4, day_count + 4, 7)
    worksheet.merge_range(0, 0, 0, 4 + day_count, 'Отчёт о работе за %s' % string_date, cell_format)
    worksheet.write(1, 0, '№', cell_format)
    worksheet.write(1, 1, 'Проект', cell_format)
    worksheet.write(1, 2, 'Направление', cell_format)
    worksheet.write(1, 3, 'Вид работы', cell_format)
    for day in range(1, day_count + 1):
        worksheet.write(1, 3 + day, day, cell_format)
    worksheet.write(1, day_count + 4, 'Итого', cell_format)
    start_row = 2
    for project in items:
        idx = items.index(project) + 1
        rows = project.get('rows') - 1
        project_name = project.get('project', 'Без проекта')
        if rows > 0:
            worksheet.merge_range(start_row, 0, start_row + rows, 0, idx, cell_format)
            worksheet.merge_range(start_row, 1, start_row + rows, 1, project_name, cell_format)
        else:
            worksheet.write(start_row, 0, idx, cell_format)
            worksheet.write(start_row, 1, project_name, cell_format)
        dir_start_row = start_row
        for direction in project.get('directions', []):
            dir_rows = direction.get('rows') - 1
            dir_name = direction.get('direction', 'Без направления')
            if dir_rows > 0:
                worksheet.merge_range(dir_start_row, 2, dir_start_row + dir_rows, 2, dir_name, cell_format)
            else:
                worksheet.write(dir_start_row, 2, dir_name, cell_format)
            type_start_row = dir_start_row
            for activity_type in direction.get('types', []):
                type_name = activity_type.get('type', 'Без вида работы')
                worksheet.write(type_start_row, 3, type_name, cell_format)
                for day in activity_type.get('days', []):
                    day_index = activity_type.get('days', []).index(day) + 4
                    worksheet.write(type_start_row, day_index, day.get('duration', 0), cell_format)
                type_start_row += 1
            dir_start_row += dir_rows + 1
        start_row += rows + 1
    workbook.close()
    return document_name


def create_excel_report(activities, start, end, user_id, report_id):
    items = get_items_for_report(activities, start, end)
    return create_excel_document(items, start, end, user_id, report_id)


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
