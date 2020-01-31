import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { add} from 'date-fns';

import { ActivityService } from '../../../../core/services/activity';
import { BaseDestroy } from '../../../../common/models/base-destroy';
import { DayActivityParam } from '../../../../common/models/params';
import { SubjectService } from '../../../../core/services/subject';
import { ActivityModel } from '../../../../common/models/activity';
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
  dayFormat: string = 'dd MMMM yyyy, cccc';
  activities$: Observable<ActivityModel[]>;
  userId: number;

  constructor(private readonly activityService: ActivityService,
              private readonly subjectService: SubjectService,
              private readonly authService: AuthService) {
    super();
    this.userId = this.authService.currentUser.id;
    this.subscribeSubject();
  }

  subscribeSubject() {
    this.subjectService.getActivitySubject
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getActivities());
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
    this.isNotToday = !compareDates(this.currentDate, new Date());
    this.getActivities();
  }

  private _getActivities(): Observable<ActivityModel[]> {
    return this.activityService.getDayActivity(this.generateParams())
      .pipe(
        map(response => response.results)
      );
  }

  private generateParams(): DayActivityParam {
    return new DayActivityParam(this.userId, this.currentDate);
  }
}
