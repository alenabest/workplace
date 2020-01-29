import { NgModule } from '@angular/core';

import { MonthActivityPageComponent } from './month-activity-page';
import { CoreModule, MaterialModules } from '../../../core';



@NgModule({
  declarations: [MonthActivityPageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [MonthActivityPageComponent]
})
export class MonthActivityComponentsModule { }
