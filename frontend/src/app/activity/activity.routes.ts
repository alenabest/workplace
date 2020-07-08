import { Route } from '@angular/router';

import { MonthActivityComponent } from './month-activity';
import { ActivityComponent } from './activity.component';
import { WeekActivityComponent } from './week-activity';
import { DayActivityComponent } from './day-activity';




export const ACTIVITY_ROUTES: Route[] = [
  {
    path: 'app/activity',
    component: ActivityComponent,
    children: [
      {
        path: 'day',
        component: DayActivityComponent
      },
      {
        path: 'week',
        component: WeekActivityComponent
      },
      {
        path: 'month',
        component: MonthActivityComponent
      }
    ]
  },
];
