import { Component, OnDestroy } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { addMonths } from 'date-fns';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MonthActivityParam } from '../../common/models/params';
import { SubjectService } from '../../core/services/subject';
import { ActivityService } from '../activity.service';
import { MonthActivityModel } from '../../server-api';
import { WeekListModel } from '../week-activity';
import { DateValue } from '../activity-data';
import { LoginService } from '../../login';


@UntilDestroy()
@Component({
  selector: 'month-activity',
  templateUrl: './month-activity.component.html',
  styleUrls: ['./month-activity.component.scss']
})
export class MonthActivityComponent implements OnDestroy {
  monthActivities$: Observable<MonthActivityModel[]>;
  monthFormat: string = 'LLLL yyyy';
  currentDate: Date = new Date();
  weekList: WeekListModel[] = [];
  userId: number = this.loginService.currentUser.id;
  start: Date;
  end: Date;

  constructor(private activityService: ActivityService,
              private subjectService: SubjectService,
              private loginService: LoginService) {
    this.subscribeSubject();
    this.prepareMonthData();
  }

  ngOnDestroy() {
  }

  subscribeSubject() {
    this.subjectService.getActivitySubject
      .pipe(untilDestroyed(this))
      .subscribe(() => this.getMonthActivity());
  }

  prepareMonthData() {
    [this.start, this.end] = this.activityService.getStartAndEndDate(this.currentDate);
    this.weekList = this.activityService.getWeekList(this.start, this.end);
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
      .pipe(map(response => response.results));
  }

  getParams(): MonthActivityParam {
    return new MonthActivityParam(this.userId, this.start, this.end, this.weekList);
  }

}
