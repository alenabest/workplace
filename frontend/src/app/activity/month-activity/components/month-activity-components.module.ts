import { NgModule } from '@angular/core';

import { DateFormatPipeModule } from '../../../common/pipes/date-format';
import { MonthActivityCardComponent } from './month-activity-card';
import { MonthActivityPageComponent } from './month-activity-page';
import { CoreModule, MaterialModules } from '../../../core';
import { ActivityComponentsModule } from '../../components';



@NgModule({
  declarations: [MonthActivityPageComponent, MonthActivityCardComponent],
  imports: [
    CoreModule,
    MaterialModules,
    DateFormatPipeModule,
    ActivityComponentsModule
  ],
  exports: [MonthActivityPageComponent]
})
export class MonthActivityComponentsModule { }
