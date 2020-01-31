import { NgModule } from '@angular/core';

import { DateFormatPipeModule } from '../../../common/pipes/date-format';
import { WeekActivityPageComponent } from './week-activity-page';
import { WeekActivityCardComponent } from './week-activity-card';
import { CoreModule, MaterialModules } from '../../../core';
import { ActivityComponentsModule } from '../../components';



@NgModule({
  declarations: [WeekActivityPageComponent, WeekActivityCardComponent],
  imports: [
    CoreModule,
    MaterialModules,
    ActivityComponentsModule,
    DateFormatPipeModule
  ],
  exports: [WeekActivityPageComponent]
})
export class WeekActivityComponentsModule { }
