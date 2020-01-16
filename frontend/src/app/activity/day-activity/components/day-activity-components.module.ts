import { NgModule } from '@angular/core';

import { DayActivityPageComponent } from './day-activity-page/day-activity-page.component';
import { DayActivityCardComponent } from './day-activity-card/day-activity-card.component';
import { CoreModule, MaterialModules } from '../../../core';



@NgModule({
  declarations: [DayActivityPageComponent, DayActivityCardComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [DayActivityPageComponent]
})
export class DayActivityComponentsModule { }
