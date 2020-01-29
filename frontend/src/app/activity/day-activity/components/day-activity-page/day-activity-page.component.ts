import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { ru as locale } from 'date-fns/locale';
import { add, format } from 'date-fns';
import { Observable } from 'rxjs';

import { ActivityDayParam, ActivityModel } from '../../../../common/models/activity';
import { ActivityService } from '../../../../core/services/activity';
import { BaseDestroy } from '../../../../common/models/base-destroy';
import { SubjectService } from '../../../../core/services/subject';
import { AuthService } from '../../../../core/services/auth';
import { compareDates } from '../../../../common/utils';
import { DateValue } from '../../../data';


@Component({
  selector: 'day-activity-page',
  templateUrl: './day-activity-page.component.html',
  styleUrls: ['./day-activity-page.component.scss']
})
export class DayActivityPageComponent extends BaseDestroy implements OnInit {
  isNotToday: boolean = false;
  currentDate: Date = new Date();
  dateFormat: string = 'dd MMMM yyyy, cccc';
  activities$: Observable<ActivityModel[]>;
  currentDayLabel: string = '';
  userId: number;

  constructor(private readonly activityService: ActivityService,
              private readonly subjectService: SubjectService,
              private readonly authService: AuthService) {
    super();
    this.userId = this.authService.currentUser.id;
    this.currentDayLabel = this.getCurrentDayLabel();
    this.subscribeSubject();
  }

  subscribeSubject() {
    this.subjectService.getActivitySubject
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(date => this.completeSubscribe(date));
  }

  completeSubscribe(date: Date) {
    if (date && compareDates(date, this.currentDate)) {
      this.getActivities();
    }
  }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.activities$ = this._getActivities();
  }

  changeDay(event: MatDatepickerInputEvent<any> | DateValue, days?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = add(this.currentDate, { days });
    }
    this.isNotToday = this.checkDate();
    this.currentDayLabel = this.getCurrentDayLabel();
    this.getActivities();
  }

  checkDate(): boolean {
    const current = format(this.currentDate, 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');
    return current !== today;
  }

  getCurrentDayLabel(): string {
    return format(this.currentDate, this.dateFormat, { locale });
  }

  private _getActivities(): Observable<ActivityModel[]> {
    return this.activityService.getDayActivity(this.generateParams())
      .pipe(
        map(response => response.results)
      );
  }

  private generateParams(): ActivityDayParam {
    const params = new ActivityDayParam();
    params.user = this.userId;
    params.activityDate = format(this.currentDate, 'yyyy-MM-dd');

    return params;
  }
}
