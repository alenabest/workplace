import { NgModule } from '@angular/core';

import { WeekActivityPageComponent } from './week-activity-page/week-activity-page.component';
import { CoreModule, MaterialModules } from '../../../core';



@NgModule({
  declarations: [WeekActivityPageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [WeekActivityPageComponent]
})
export class WeekActivityComponentsModule { }
