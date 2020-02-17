import os
import unicodedata
from datetime import datetime, timedelta

from django.utils.http import urlquote


def get_string_month_year(date):
    months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
              'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    new_date = datetime.strptime(date, '%Y-%m-%d')
    year = new_date.year
    month = months[new_date.month - 1]
    return [month, year]


def get_string_date(date, date_format):
    return date.strftime(date_format)


def get_date_list(start, end):
    start_day = datetime.strptime(start, '%Y-%m-%d')
    end_day = datetime.strptime(end, '%Y-%m-%d')
    date_list = []
    new_date = start_day
    for index in range(start_day.day, end_day.day + 1):
        date_list.append({'day': new_date.day, 'date': new_date.date(), 'weekend': new_date.weekday() > 4})
        new_date = new_date + timedelta(days=1)
    return date_list


def convert_minutes_to_hour(duration):
    if duration:
        duration = int(duration)
        hours = float(duration / 60)
        return f"{hours:.1f}"
    else:
        return 0


def rfc5987_content_disposition(file_name):
    ascii_name = unicodedata.normalize('NFKD', file_name).encode('ascii', 'ignore').decode()
    header = 'attachment; filename="{}"'.format(ascii_name)
    if ascii_name != file_name:
        quoted_name = urlquote(file_name)
        header += '; filename*=UTF-8\'\'{}'.format(quoted_name)

    return header


def get_name_file_field(field):
    if field and field.path:
        return os.path.basename(field.path)
    return 'Без имени'
