from datetime import datetime, timedelta


def get_string_month_year(date):
    months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
              'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    new_date = datetime.strptime(date, '%Y-%m-%d')
    year = new_date.year
    month = months[new_date.month - 1]
    return [month, year]


def get_date_list(start, end):
    start_day = datetime.strptime(start, '%Y-%m-%d')
    end_day = datetime.strptime(end, '%Y-%m-%d')
    date_list = []
    new_date = start_day
    for index in range(start_day.day, end_day.day + 1):
        date_list.append({'day': new_date.day, 'date': new_date.date()})
        new_date = new_date + timedelta(days=1)
    return date_list
