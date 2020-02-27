import { add, endOfMonth, endOfWeek, getWeek, startOfMonth, startOfWeek } from 'date-fns';
import { ru as locale } from 'date-fns/locale';

import { BaseDestroy } from '../base-destroy';
import { WeekListModel } from '../dictionary';
import { dateInDiapason } from '../../utils';



export class BaseMonthActivity extends BaseDestroy {
  constructor() {
    super();
  }

  getWeekList(start: Date, end: Date): WeekListModel[] {
    const weekList = [];
    let date = start;
    while (dateInDiapason(date, start, end)) {
      const weekLabel = getWeek(date, { locale });
      const week = weekList.find(item => item.label === weekLabel);
      if (week) {
        weekList.find(item => item.label === weekLabel).days.push(date);
      } else {
        weekList.push({ label: weekLabel, days: [date] });
      }
      date = add(date, { days: 1 });
    }

    return weekList;
  }

  getStartAndEndDate(currentDate: Date): Date[] {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);

    return [startOfWeek(startMonth, { locale }), endOfWeek(endMonth, { locale })];
  }
}