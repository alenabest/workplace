import { NgModule } from '@angular/core';

import { DateFormatPipeModule } from '../../../common/pipes/date-format';
import { MonthActivityPageComponent } from './month-activity-page';
import { MonthActivityCardComponent } from './month-activity-card';
import { CoreModule, MaterialModules } from '../../../core';
import { ActivityComponentsModule } from '../../components';



@NgModule({
  declarations: [MonthActivityCardComponent, MonthActivityPageComponent],
  imports: [
    CoreModule,
    MaterialModules,
    DateFormatPipeModule,
    ActivityComponentsModule
  ],
  exports: []
})
export class MonthActivityComponentsModule { }
