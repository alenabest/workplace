import { NgModule } from '@angular/core';

import { ValidationErrorComponentModule } from '../../common/components/validation-error';
import { ProjectDialogComponent } from '../../common/dialogs/project-dialog/component';
import { EditOptionModule } from '../../common/directives/edit-dictionary-option';
import { TimeMaskDirectiveModule } from '../../common/directives/time-mask';
import { ProjectDialogModule } from '../../common/dialogs/project-dialog';
import { ViewActivityDialogComponent } from './view-activity-dialog';
import { ActivityDialogComponent } from './activity-dialog';
import { CoreModule, MaterialModules } from '../../core';
import { DictionarySelectModule } from '../../common/components/dictionary-select';


const dialogs = [
  ActivityDialogComponent,
  ViewActivityDialogComponent
];

@NgModule({
  declarations: [dialogs],
  imports: [
    ValidationErrorComponentModule,
    TimeMaskDirectiveModule,
    ProjectDialogModule,
    EditOptionModule,
    MaterialModules,
    CoreModule,
    DictionarySelectModule
  ],
  entryComponents: [ProjectDialogComponent],
  exports: [dialogs]
})
export class ActivityDialogsModule {
}
