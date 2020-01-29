import { NgModule } from '@angular/core';

import { ValidationErrorComponentModule } from '../../common/components/validation-error';
import { ViewActivityDialogComponent } from './view-activity-dialog';
import { ActivityDialogComponent } from './activity-dialog';
import { CoreModule, MaterialModules } from '../../core';


const dialogs = [
  ActivityDialogComponent,
  ViewActivityDialogComponent
];

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
