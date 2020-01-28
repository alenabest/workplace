import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { ru as locale } from 'date-fns/locale';
import { add, format } from 'date-fns';
import { Observable } from 'rxjs';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ActivityDayParam, ActivityModel } from '../../../../common/models/activity';
import { AuthService } from '../../../../core/services/auth';
import { DateValue } from '../../../data';


@Component({
  selector: 'day-activity-page',
  templateUrl: './day-activity-page.component.html',
  styleUrls: ['./day-activity-page.component.scss']
})
export class DayActivityPageComponent implements OnInit {
  isNotToday: boolean = false;
  currentDate: Date = new Date();
  dateFormat: string = 'dd MMMM yyyy, cccc';
  activities$: Observable<ActivityModel[]>;
  currentDayLabel: string = '';
  userId: number;

  constructor(private readonly activityService: ActivityService,
              private readonly authService: AuthService) {
    this.userId = this.authService.currentUser.id;
    this.currentDayLabel = this.getCurrentDayLabel();
  }

  ngOnInit() {
    this.getActivity();
  }

  getActivity() {
    this.activities$ = this._getActivity();
  }

  changeDay(event: MatDatepickerInputEvent<any> | DateValue, days?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = add(this.currentDate, { days });
    }
    this.isNotToday = this.checkDate();
    this.currentDayLabel = this.getCurrentDayLabel();
    this.getActivity();
  }

  checkDate(): boolean {
    const current = format(this.currentDate, 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');
    return current !== today;
  }

  getCurrentDayLabel(): string {
    return format(this.currentDate, this.dateFormat, { locale });
  }

  private _getActivity(): Observable<ActivityModel[]> {
    return this.activityService.getDayActivity(this.generateParams());
  }

  private generateParams(): ActivityDayParam {
    const params = new ActivityDayParam();
    params.user = this.userId;
    params.activityDate = format(this.currentDate, 'yyyy-MM-dd');

    return params;
  }
}
