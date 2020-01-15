import { NgModule } from '@angular/core';

import { DayActivityPageComponent } from './day-activity-page/day-activity-page.component';
import { CoreModule, MaterialModules } from '../../../core';



@NgModule({
  declarations: [DayActivityPageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [DayActivityPageComponent]
})
export class DayActivityComponentsModule { }
