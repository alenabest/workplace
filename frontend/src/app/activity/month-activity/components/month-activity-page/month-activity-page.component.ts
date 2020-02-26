import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { addMonths } from 'date-fns';
import { Observable } from 'rxjs';

import { MonthActivityModel } from '../../../../common/models/activity';
import { MonthActivityParam } from '../../../../common/models/params';
import { WeekListModel } from '../../../../common/models/dictionary';
import { ActivityService } from '../../../../core/services/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BaseMonthActivity } from '../../../../common/models/base';
import { AuthService } from '../../../../core/services/auth';
import { DateValue } from '../../../data';


@Component({
  selector: 'month-activity-page',
  templateUrl: './month-activity-page.component.html',
  styleUrls: ['./month-activity-page.component.scss']
})
export class MonthActivityPageComponent extends BaseMonthActivity {
  monthActivities$: Observable<MonthActivityModel[]>;
  monthFormat: string = 'LLLL yyyy';
  currentDate: Date = new Date();
  weekList: WeekListModel[] = [];
  userId: number;
  start: Date;
  end: Date;

  constructor(private readonly activityService: ActivityService,
              private readonly subjectService: SubjectService,
              private readonly authService: AuthService) {
    super();
    this.userId = this.authService.currentUser.id;
    this.subscribeSubject();
    this.prepareMonthData();
  }

  subscribeSubject() {
    this.subjectService.getActivitySubject
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getMonthActivity());
  }

  prepareMonthData() {
    [this.start, this.end] = this.getStartAndEndDate(this.currentDate);
    this.weekList = this.getWeekList(this.start, this.end);
    this.getMonthActivity();
  }

  changeMonth(event: MatDatepickerInputEvent<any> | DateValue, count?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = addMonths(this.currentDate, count);
    }
    this.prepareMonthData();
  }

  getMonthActivity() {
    this.monthActivities$ = this._getMonthActivity();
  }

  _getMonthActivity(): Observable<MonthActivityModel[]> {
    return this.activityService.getMonthActivity(this.getParams())
      .pipe(
        map(response => response.results)
      );
  }

  getParams(): MonthActivityParam {
    return new MonthActivityParam(this.userId, this.start, this.end, this.weekList);
  }
}
