import { NgModule } from '@angular/core';

import { MonthActivityPageComponent } from './month-activity-page';
import { CoreModule, MaterialModules } from '../../../core';
import { DateFormatPipeModule } from '../../../common/pipes/date-format';
import { ActivityComponentsModule } from '../../components';



@NgModule({
  declarations: [MonthActivityPageComponent],
  imports: [
    CoreModule,
    MaterialModules,
    DateFormatPipeModule,
    ActivityComponentsModule
  ],
  exports: [MonthActivityPageComponent]
})
export class MonthActivityComponentsModule { }
