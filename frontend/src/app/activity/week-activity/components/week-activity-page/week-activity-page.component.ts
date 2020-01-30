import { Component, OnInit } from '@angular/core';
import { ru as locale } from 'date-fns/locale';
import { add, lastDayOfWeek } from 'date-fns';

import { ActivityService } from '../../../../core/services/activity';
import { SubjectService } from '../../../../core/services/subject';
import { AuthService } from '../../../../core/services/auth';
import { MatDatepickerInputEvent } from '@angular/material';
import { DateValue, WeekArray } from '../../../data';
import { Observable } from 'rxjs';
import { ActivityWeekModel } from '../../../../common/models/activity';


@Component({
  selector: 'week-activity-page',
  templateUrl: './week-activity-page.component.html',
  styleUrls: ['./week-activity-page.component.scss']
})
export class WeekActivityPageComponent implements OnInit {
  weekFormat: string = 'dd MMMM yyyy';
  currentDate: Date = new Date();
  weekArray = WeekArray;
  monday: Date;
  sunday: Date;
  userId: number;

  weekActivities$: Observable<ActivityWeekModel[]>;

  constructor(private readonly activityService: ActivityService,
              private readonly subjectService: SubjectService,
              private readonly authService: AuthService) {
    this.userId = this.authService.currentUser.id;
    this.getWeeks();
  }

  ngOnInit() {
    this.getWeekActivity();
  }

  getWeekActivity() {
  }

  getWeeks() {
    this.sunday = lastDayOfWeek(this.currentDate, { locale });
    this.monday = add(this.sunday, { days: -6 });
    this.weekArray.map((item, index) => item.date = add(this.monday, {days: index}));
  }

  changeWeek(event: MatDatepickerInputEvent<any> | DateValue, days?: number) {
    if (event) {
      this.currentDate = event.value;
    } else {
      this.currentDate = add(this.currentDate, { days });
    }
    this.getWeeks();
  }
}
