import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MonthActivityModule } from './month-activity';
import { WeekActivityModule } from './week-activity';
import { ACTIVITY_ROUTES } from './activity.routes';
import { DayActivityModule } from './day-activity';


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
