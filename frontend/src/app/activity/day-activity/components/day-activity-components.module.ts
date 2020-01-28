import { NgModule } from '@angular/core';

import { DayActivityPageComponent } from './day-activity-page/day-activity-page.component';
import { DayActivityCardComponent } from './day-activity-card/day-activity-card.component';
import { ActivityComponentsModule } from '../../components/activity-components.module';
import { CoreModule, MaterialModules } from '../../../core';



@NgModule({
  declarations: [DayActivityPageComponent, DayActivityCardComponent],
  imports: [
    CoreModule,
    MaterialModules,
    ActivityComponentsModule
  ],
  exports: [DayActivityPageComponent]
})
export class DayActivityComponentsModule { }
