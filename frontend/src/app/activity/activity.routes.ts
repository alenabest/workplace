import { Route } from '@angular/router';

import { MonthActivityPageComponent } from './month-activity/components/month-activity-page';
import { WeekActivityPageComponent } from './week-activity/components/week-activity-page';
import { DayActivityPageComponent } from './day-activity/components/day-activity-page';



export const ACTIVITY_ROUTES: Route[] = [
  {
    path: 'app/activity/day',
    component: DayActivityPageComponent
  },
  {
    path: 'app/activity/week',
    component: WeekActivityPageComponent
  },
  {
    path: 'app/activity/month',
    component: MonthActivityPageComponent
  }
];
