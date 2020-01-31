import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { add, endOfWeek, startOfWeek } from 'date-fns';
import { map, takeUntil } from 'rxjs/operators';
import { ru as locale } from 'date-fns/locale';
import { Observable } from 'rxjs';

import { WeekActivityModel } from '../../../../common/models/activity';
import { WeekLabelModel } from '../../../../common/models/dictionary';
import { WeekActivityParam } from '../../../../common/models/params';
import { ActivityService } from '../../../../core/services/activity';
import { BaseDestroy } from '../../../../common/models/base-destroy';
import { SubjectService } from '../../../../core/services/subject';
import { AuthService } from '../../../../core/services/auth';
import { DateValue, WeekArray } from '../../../data';


@Component({
  selector: 'week-activity-page',
  templateUrl: './week-activity-page.component.html',
  styleUrls: ['./week-activity-page.component.scss']
})

export class WeekActivityPageComponent extends BaseDestroy implements OnInit {
  weekFormat: string = 'dd MMMM yyyy';
  currentDate: Date = new Date();
  weekArray: WeekLabelModel[];
  userId: number;
  monday: Date;
  sunday: Date;

  weekActivities$: Observable<WeekActivityModel[]>;

  constructor(private readonly activityService: ActivityService,
              private readonly subjectService: SubjectService,
              private readonly authService: AuthService) {
    super();
    this.userId = this.authService.currentUser.id;
    this.subscribeSubject();
    this.prepareWeekData();
  }

  subscribeSubject() {
    this.subjectService.getActivitySubject
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getWeekActivity());
  }

  ngOnInit() {
    this.getWeekActivity();
  }

  getWeekActivity() {
    this.weekActivities$ = this._getWeekActivity();
  }

  getMondaySunday(): Date[] {
    const sunday = endOfWeek(this.currentDate, { locale });
    const monday = startOfWeek(this.currentDate, { locale });

    return [monday, sunday];
  }

  getWeekArray(): WeekLabelModel[] {
    const weekArray = WeekArray;
    weekArray.map((item, index) => item.date = add(this.monday, { days: index }));

    return weekArray;
  }

  prepareWeekData() {
    [this.monday, this.sunday] = this.getMondaySunday();
    this.weekArray = this.getWeekArray();
  }

  changeWeek(event: MatDatepickerInputEvent<any> | DateValue, days?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = add(this.currentDate, { days });
    }
    this.prepareWeekData();
    this.getWeekActivity();
  }

  _getWeekActivity(): Observable<WeekActivityModel[]> {
    return this.activityService.getWeekActivity(new WeekActivityParam(this.userId, this.monday, this.sunday))
      .pipe(
        map(response => response.results)
      );
  }
}
