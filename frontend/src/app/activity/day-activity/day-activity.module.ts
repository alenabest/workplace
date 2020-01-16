import { NgModule } from '@angular/core';

import { DayActivityComponentsModule } from './components/day-activity-components.module';


@NgModule({
  imports: [DayActivityComponentsModule],
  exports: [DayActivityComponentsModule]
})
export class DayActivityModule {
}
