import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { addWeeks} from 'date-fns';

import { WeekActivityModel } from '../../../../common/models/activity';
import { WeekLabelModel } from '../../../../common/models/dictionary';
import { WeekActivityParam } from '../../../../common/models/params';
import { ActivityService } from '../../../../core/services/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BaseWeekActivity } from '../../../../common/models/base';
import { AuthService } from '../../../../core/services/auth';
import { DateValue } from '../../../data';


@Component({
  selector: 'week-activity-page',
  templateUrl: './week-activity-page.component.html',
  styleUrls: ['./week-activity-page.component.scss']
})

export class WeekActivityPageComponent extends BaseWeekActivity {
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

  getWeekActivity() {
    this.weekActivities$ = this._getWeekActivity();
  }

  prepareWeekData() {
    [this.monday, this.sunday] = this.getMondaySunday(this.currentDate);
    this.weekArray = this.getWeekArray(this.monday);
    this.getWeekActivity();
  }

  changeWeek(event: MatDatepickerInputEvent<any> | DateValue, week?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = addWeeks(this.currentDate, week);
    }
    this.prepareWeekData();
  }

  _getWeekActivity(): Observable<WeekActivityModel[]> {
    return this.activityService.getWeekActivity(this.getParams())
      .pipe(
        map(response => response.results)
      );
  }

  getParams(): WeekActivityParam {
    return new WeekActivityParam(this.userId, this.monday, this.sunday);
  }
}