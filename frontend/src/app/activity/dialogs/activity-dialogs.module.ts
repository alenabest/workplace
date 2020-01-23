import { NgModule } from '@angular/core';

import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';
import { CoreModule, MaterialModules } from '../../core';


const dialogs = [ActivityDialogComponent];

@NgModule({
  declarations: [dialogs],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [dialogs]
})
export class ActivityDialogsModule {
}
