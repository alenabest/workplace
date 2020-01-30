import { NgModule } from '@angular/core';

import { ViewActivityDialogComponent } from '../../dialogs/view-activity-dialog';
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
    ActivityDialogsModule
  ],
  entryComponents: [ViewActivityDialogComponent],
  exports: [DayActivityPageComponent]
})
export class DayActivityComponentsModule { }
