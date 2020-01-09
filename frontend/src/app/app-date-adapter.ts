import { DateAdapter } from '@angular/material';
import { Dayjs, isDayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';


/**
 * Custom Date-Formats and Adapter (using https://github.com/iamkun/dayjs)
 */

export const AppDateFormat = {
  parse: {
    dateInput: 'DD.MM.YYYY'
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  }
};

const dateNames: string[] = [];
for (let date = 1; date <= 31; date++) {
  dateNames.push(String(date));
}

export class AppDateAdapter extends DateAdapter<Dayjs> {
  constructor() {
    super();
    dayjs.locale('ru');
    dayjs.extend(customParseFormat);
    dayjs.extend(localizedFormat);
    console.log(dayjs());
  }

  invalid(): Dayjs {
    return dayjs();
  }

  getYear(date: Dayjs): number {
    return date.year();
  }

  getMonth(date: Dayjs): number {
    return date.month();
  }

  getDate(date: Dayjs): number {
    return date.date();
  }

  getDayOfWeek(date: Dayjs): number {
    return date.day();
  }

  getFirstDayOfWeek(): number {
    console.log(dayjs.Ls.ru.weekStart);

    return dayjs.Ls.ru.weekStart;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_');
      case 'short':
        return 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_');
      case 'narrow':
        return 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_');
    }
  }

  getDateNames(): string[] {
    return dateNames;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return dayjs.Ls.ru.weekdays;
      case 'short':
        return dayjs.Ls.ru.weekdaysShort;
      case 'narrow':
        return dayjs.Ls.ru.weekdaysMin;
    }
  }

  getYearName(date: Dayjs): string {
    return String(date.year());
  }

  getNumDaysInMonth(date: Dayjs): number {
    return date.daysInMonth();
  }

  clone(date: Dayjs): Dayjs {
    return date.clone();
  }

  createDate(year: number, month: number, date: number): Dayjs {
    return dayjs([year, month, date].join('.'));
  }

  today(): Dayjs {
    return dayjs();
  }

  parse(value: any, parseFormat: any): Dayjs | null {
    let dateItem = dayjs(value, parseFormat, 'ru');
    if (!dateItem.isValid()) {
      dateItem = dayjs(value);
    }

    if (dateItem.isValid()) {
      return dateItem;
    }

    return null;
  }

  format(date: Dayjs, displayFormat: any): string {
    if (date) {
      return dayjs(date).format(displayFormat);
    }

    return '';
  }

  addCalendarYears(date: Dayjs, years: number): Dayjs {
    return date.clone().add(years, 'year');
  }

  addCalendarMonths(date: Dayjs, months: number): Dayjs {
    return date.clone().add(months, 'month');
  }

  addCalendarDays(date: Dayjs, days: number): Dayjs {
    return date.clone().add(days, 'day');
  }

  compareDate(first: Dayjs, second: Dayjs): number {
    return first.diff(second, 'second', true);
  }

  sameDate(first: Dayjs | null, second: Dayjs | null): boolean {
    if (first === null) {
      return second === null;
    } else if (isDayjs(first)) {
      return first.isSame(second);
    }

    return super.sameDate(first, second);
  }

  clampDate(date: Dayjs, min?: Dayjs | null, max?: Dayjs | null): Dayjs {
    if (min && date.isBefore(min)) {
      return min;
    } else if (max && date.isAfter(max)) {
      return max;
    }

    return date;
  }

  isValid(date: Dayjs): boolean {
    return date.isValid();
  }

  isDateInstance(obj: any): boolean {
    return isDayjs(obj);
  }

  toIso8601(date: Dayjs): string {
    return date.format();
  }
}
