import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { add} from 'date-fns';

import { ActivityService } from '../../../../core/services/activity';
import { DayActivityParam } from '../../../../common/models/params';
import { SubjectService } from '../../../../core/services/subject';
import { ActivityModel } from '../../../../common/models/activity';
import { cloneDeep, compareDates } from '../../../../common/utils';
import { DateValue, TimeArray, TimeModel } from '../../../data';
import { LoginService } from '../../../../login';


@UntilDestroy()
@Component({
  selector: 'day-activity-page',
  templateUrl: './day-activity-page.component.html',
  styleUrls: ['./day-activity-page.component.scss']
})
export class DayActivityPageComponent implements OnInit, OnDestroy {
  isNotToday: boolean = false;
  currentDate: Date = new Date();
  dayFormat: string = 'dd MMMM yyyy, cccc';
  activities$: Observable<ActivityModel[]>;
  userId: number;

  timeArray = cloneDeep(TimeArray);

  constructor(private readonly activityService: ActivityService,
              private readonly subjectService: SubjectService,
              private readonly loginService: LoginService) {
    this.userId = this.loginService.currentUser.id;
    this.subscribeSubject();
  }

  ngOnDestroy() {
  }

  subscribeSubject() {
    this.subjectService.getActivitySubject
      .pipe(untilDestroyed(this))
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

  calculateTimeItem(item: TimeModel, activity: ActivityModel): TimeModel {
    if (item.hour === activity.startHour) {
      const duration = 20 - activity.duration;
      item.height += duration;
    }

    return item;
  }

  calculateTimeArray(results: ActivityModel[]): TimeModel[] {
    const timeArray = cloneDeep(TimeArray);
    const littleActivities = results.filter(item => item.duration < 20);
    littleActivities.forEach(activity => timeArray.map(item => this.calculateTimeItem(item, activity)));

    return timeArray;
  }

  private _getActivities(): Observable<ActivityModel[]> {
    return this.activityService.getDayActivity(this.generateParams())
      .pipe(
        map(response => response.results),
        tap(results => this.timeArray = this.calculateTimeArray(results))
      );
  }

  private generateParams(): DayActivityParam {
    return new DayActivityParam(this.userId, this.currentDate);
  }
}
