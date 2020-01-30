import { NgModule } from '@angular/core';

import { ViewActivityDialogComponent } from '../../dialogs/view-activity-dialog';
import { DateFormatPipeModule } from '../../../common/pipes/date-format';
import { DayActivityPageComponent } from './day-activity-page';
import { DayActivityCardComponent } from './day-activity-card';
import { ActivityComponentsModule } from '../../components';
import { CoreModule, MaterialModules } from '../../../core';
import { ActivityDialogsModule } from '../../dialogs';



@NgModule({
  declarations: [
    DayActivityPageComponent,
    DayActivityCardComponent
  ],
  imports: [
    CoreModule,
    MaterialModules,
    ActivityComponentsModule,
    ActivityDialogsModule,
    DateFormatPipeModule
  ],
  entryComponents: [ViewActivityDialogComponent],
  exports: [DayActivityPageComponent]
})
export class DayActivityComponentsModule { }
