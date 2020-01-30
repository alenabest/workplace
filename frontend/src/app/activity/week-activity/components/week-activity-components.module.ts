import { NgModule } from '@angular/core';

import { WeekActivityPageComponent } from './week-activity-page';
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
