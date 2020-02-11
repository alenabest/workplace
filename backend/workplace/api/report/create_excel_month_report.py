import xlsxwriter

from workplace.common.utils import get_string_month_year, get_date_list
from workplace.models import User


def get_workbook(user_id, string_date):
    user = User.objects.get(id=user_id)
    [last_name, first_name] = [user.last_name, user.first_name]
    document_name = '%s %s - отчет за %s.xlsx' % (last_name, first_name, string_date)
    return xlsxwriter.Workbook(document_name)


def get_cell_format(workbook):
    cell_format = workbook.add_format()
    cell_format.set_font_size(11)
    cell_format.set_align('center')
    cell_format.set_align('vcenter')
    cell_format.set_font('Calibri')
    cell_format.set_border()
    return cell_format


def get_header_cell_format(workbook, bold):
    cell_format = get_cell_format(workbook)
    cell_format.set_bg_color('#b8def5')
    cell_format.set_bold(bold)
    return cell_format


def fill_month_report_worksheet(workbook, cell_format, string_date, day_count, items):
    header_cell_format = get_header_cell_format(workbook, False)
    total_cell_format = get_header_cell_format(workbook, True)
    worksheet = workbook.add_worksheet('Отчёт за месяц')
    worksheet.set_default_row(25)
    worksheet.set_column(0, 0, 3)
    worksheet.set_column(1, 3, 25)
    worksheet.set_column(4, day_count + 3, 3)
    worksheet.set_column(day_count + 4, day_count + 4, 7)
    worksheet.merge_range(0, 0, 0, 4 + day_count, 'Отчёт о работе за %s' % string_date, cell_format)
    worksheet.write(1, 0, '№', header_cell_format)
    worksheet.write(1, 1, 'Проект', header_cell_format)
    worksheet.write(1, 2, 'Направление', header_cell_format)
    worksheet.write(1, 3, 'Вид работы', header_cell_format)
    total_day_duration = []
    for day in range(1, day_count + 1):
        total_day_duration.append({'total': float()})
        worksheet.write(1, 3 + day, day, header_cell_format)
    worksheet.write(1, day_count + 4, 'Итого', total_cell_format)
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
                activity_days = activity_type.get('days', [])
                month_duration = float(0)

                for day in activity_days:
                    idx = activity_days.index(day)
                    duration = float(day.get('duration', 0))
                    day_index = idx + 4
                    if duration == float(0):
                        worksheet.write(type_start_row, day_index, '', cell_format)
                    else:
                        month_duration += duration
                        total = total_day_duration[idx]
                        total.update(total=(total.get('total') + duration))
                        worksheet.write(type_start_row, day_index, duration, cell_format)
                worksheet.write(type_start_row, len(activity_days) + 4, month_duration, total_cell_format)
                type_start_row += 1
            dir_start_row += dir_rows + 1
        start_row += rows + 1
    total_duration = float(0)
    for day in range(0, day_count):
        total = total_day_duration[day].get('total', 'asdasd')
        total_duration += total
        if total == float(0):
            total = 0
        worksheet.write(start_row, day + 4, total, total_cell_format)
    worksheet.merge_range(start_row, 0, start_row, 3, 'Итого:', total_cell_format)
    worksheet.write(start_row, day_count + 4, total_duration, total_cell_format)


def create_excel_month_report(items, start, end, user_id):
    day_count = len(get_date_list(start, end))
    [month, year] = get_string_month_year(start)
    string_date = '%s %s' % (month, year)
    workbook = get_workbook(user_id, string_date)
    cell_format = get_cell_format(workbook)
    fill_month_report_worksheet(workbook, cell_format, string_date, day_count, items)
    workbook.close()
    return 'Ссылка'
