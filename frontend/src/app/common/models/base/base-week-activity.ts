import { add, endOfWeek, startOfWeek } from 'date-fns';
import { ru as locale } from 'date-fns/locale';

import { WeekArray } from '../../../activity/data';
import { WeekLabelModel } from '../dictionary';
import { BaseDestroy } from '../base-destroy';


export class BaseWeekActivity extends BaseDestroy {
  constructor() {
    super();
  }

  getMondaySunday(currentDate: Date): Date[] {
    const sunday = endOfWeek(currentDate, { locale });
    const monday = startOfWeek(currentDate, { locale });

    return [monday, sunday];
  }

  getWeekArray(monday: Date): WeekLabelModel[] {
    const weekArray = WeekArray;
    weekArray.map((item, index) => item.date = add(monday, { days: index }));

    return weekArray;
  }
}
