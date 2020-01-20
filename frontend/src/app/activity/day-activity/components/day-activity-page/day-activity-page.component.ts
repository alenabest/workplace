import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { plainToClass } from 'class-transformer';
import { ru as locale } from 'date-fns/locale';
import { add, format } from 'date-fns';

import { DayActivityClass } from '../../../../common/models/activity';


const dayActivity = [
  {
    start: '08:00',
    end: '09:10',
    description: 'Активность 1'
  },
  {
    start: '09:10',
    end: '10:30',
    description: 'Активность 2'
  },
  {
    start: '10:30',
    end: '12:00',
    description: 'Активность 3'
  },
  {
    start: '13:00',
    end: '14:50',
    description: 'Активность 4'
  },
  {
    start: '14:50',
    end: '15:45',
    description: 'Активность 5'
  },
  {
    start: '15:45',
    end: '17:00',
    description: 'Активность 6'
  }
];

@Component({
  selector: 'day-activity-page',
  templateUrl: './day-activity-page.component.html',
  styleUrls: ['./day-activity-page.component.scss']
})
export class DayActivityPageComponent implements OnInit {
  currentDate: Date = new Date();
  dateFormat: string = 'dd MMMM yyyy, cccc';
  dayActivity: DayActivityClass[];

  get currentDayLabel(): string {
    return format(this.currentDate, this.dateFormat, { locale });
  }

  constructor() {
    this.dayActivity = plainToClass(DayActivityClass, dayActivity);
  }

  ngOnInit() {
  }

  changeDay(event: MatDatepickerInputEvent<any>) {
    this.currentDate = event.value;
  }

  getLastDate() {
    this.currentDate = add(this.currentDate, { days: -1 });
  }

  getNextDate() {
    this.currentDate = add(this.currentDate, { days: 1 });
  }
}
