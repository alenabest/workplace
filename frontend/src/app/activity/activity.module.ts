import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MonthActivityModule } from './month-activity/month-activity.module';
import { WeekActivityModule } from './week-activity/week-activity.module';
import { DayActivityModule } from './day-activity/day-activity.module';
import { ACTIVITY_ROUTES } from './activity.routes';


const modules = [
  DayActivityModule,
  WeekActivityModule,
  MonthActivityModule
];

@NgModule({
  imports: [
    RouterModule.forChild(ACTIVITY_ROUTES),
    modules
  ],
  exports: []
})
export class ActivityModule {
}
