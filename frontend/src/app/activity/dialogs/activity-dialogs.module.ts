import { NgModule } from '@angular/core';

import { ValidationErrorComponentModule } from '../../common/components/validation-error';
import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';
import { CoreModule, MaterialModules } from '../../core';


const dialogs = [ActivityDialogComponent];

@NgModule({
  declarations: [dialogs],
  imports: [
    ValidationErrorComponentModule,
    MaterialModules,
    CoreModule
  ],
  exports: [dialogs]
})
export class ActivityDialogsModule {
}
