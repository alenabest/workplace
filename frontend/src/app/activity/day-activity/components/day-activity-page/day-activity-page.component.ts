import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { ru as locale } from 'date-fns/locale';
import { add, format } from 'date-fns';
import { Observable } from 'rxjs';

import { ActivityModel } from '../../../../common/models/activity';

@Component({
  selector: 'day-activity-page',
  templateUrl: './day-activity-page.component.html',
  styleUrls: ['./day-activity-page.component.scss']
})
export class DayActivityPageComponent implements OnInit {
  currentDate: Date = new Date();
  dateFormat: string = 'dd MMMM yyyy, cccc';
  activities$: Observable<ActivityModel[]>;

  get currentDayLabel(): string {
    return format(this.currentDate, this.dateFormat, { locale });
  }

  constructor() {
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
