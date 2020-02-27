from workplace.common.utils import get_string_month_year, get_document_path_and_name


def create_excel_month_report(items, start, user_id, report_id):
    [month, year] = get_string_month_year(start)
    string_date = '%s %s' % (month, year)
    [document_path, document_name] = get_document_path_and_name(user_id, report_id, string_date)
    return ''
