import { Route } from '@angular/router';

import { DayActivityPageComponent } from './day-activity/components/day-activity-page/day-activity-page.component';
import { WeekActivityPageComponent } from './week-activity/components/week-activity-page/week-activity-page.component';
import { MonthActivityPageComponent } from './month-activity/components/month-activity-page/month-activity-page.component';


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
