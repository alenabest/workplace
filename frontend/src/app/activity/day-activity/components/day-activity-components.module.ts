import { NgModule } from '@angular/core';

import { ConfirmationDialogComponent } from '../../../common/dialogs/confirmation-dialog/component';
import { ConfirmationDialogModule } from '../../../common/dialogs/confirmation-dialog';
import { ViewActivityDialogComponent } from '../../dialogs/view-activity-dialog';
import { DateFormatPipeModule } from '../../../common/pipes/date-format';
import { DayActivityPageComponent } from './day-activity-page';
import { DayActivityCardComponent } from './day-activity-card';
import { ActivityComponentsModule } from '../../components';
import { CoreModule, MaterialModules } from '../../../core';
import { ActivityDialogsModule } from '../../dialogs';


const entryComponents = [
  ViewActivityDialogComponent,
  ConfirmationDialogComponent
];

@NgModule({
  declarations: [
    DayActivityPageComponent,
    DayActivityCardComponent
  ],
  imports: [
    ConfirmationDialogModule,
    ActivityComponentsModule,
    ActivityDialogsModule,
    DateFormatPipeModule,
    MaterialModules,
    CoreModule
  ],
  entryComponents: [entryComponents],
  exports: [DayActivityPageComponent]
})
export class DayActivityComponentsModule {
}
