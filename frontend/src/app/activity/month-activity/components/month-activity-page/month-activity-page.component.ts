import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { addMonths} from 'date-fns';

import { WeekListModel } from '../../../../common/models/dictionary';
import { BaseMonthActivity } from '../../../../common/models/base';
import { DateValue } from '../../../data';


@Component({
  selector: 'month-activity-page',
  templateUrl: './month-activity-page.component.html',
  styleUrls: ['./month-activity-page.component.scss']
})
export class MonthActivityPageComponent extends BaseMonthActivity implements OnInit {
  monthFormat: string = 'LLLL yyyy';
  currentDate: Date = new Date();
  weekList: WeekListModel[] = [];
  start: Date;
  end: Date;

  constructor() {
    super();
    this.prepareMonthData();
  }

  prepareMonthData() {
    [this.start, this.end] = this.getStartAndEndDate(this.currentDate);
    this.weekList = this.getWeekList(this.start, this.end);
  }

  changeMonth(event: MatDatepickerInputEvent<any> | DateValue, count?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = addMonths(this.currentDate, count);
    }
    this.prepareMonthData();
  }

  ngOnInit() {
  }

}
