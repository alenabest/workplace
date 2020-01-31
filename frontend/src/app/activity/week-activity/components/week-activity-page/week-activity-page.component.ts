import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { add} from 'date-fns';

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

export class WeekActivityPageComponent extends BaseWeekActivity implements OnInit {
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

  prepareWeekData() {
    [this.monday, this.sunday] = this.getMondaySunday(this.currentDate);
    this.weekArray = this.getWeekArray(this.monday);
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
