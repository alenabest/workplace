import { NgModule } from '@angular/core';

import { DirectionDialogComponent } from '../../common/dialogs/direction-dialog/component';
import { ValidationErrorComponentModule } from '../../common/components/validation-error';
import { ProjectDialogComponent } from '../../common/dialogs/project-dialog/component';
import { DictionarySelectModule } from '../../common/components/dictionary-select';
import { EditOptionModule } from '../../common/directives/edit-dictionary-option';
import { DirectionDialogModule } from '../../common/dialogs/direction-dialog';
import { TimeMaskDirectiveModule } from '../../common/directives/time-mask';
import { ProjectDialogModule } from '../../common/dialogs/project-dialog';
import { ViewActivityDialogComponent } from './view-activity-dialog';
import { BaseDialogMaterialModules, CoreModule } from '../../core';
import { ActivityDialogComponent } from './activity-dialog';


const dialogs = [
  ActivityDialogComponent,
  ViewActivityDialogComponent
];

const entryComponents = [
  ProjectDialogComponent,
  DirectionDialogComponent
];

@NgModule({
  declarations: [dialogs],
  imports: [
    ValidationErrorComponentModule,
    BaseDialogMaterialModules,
    TimeMaskDirectiveModule,
    DictionarySelectModule,
    DirectionDialogModule,
    ProjectDialogModule,
    EditOptionModule,
    CoreModule
  ],
  entryComponents: [entryComponents],
  exports: [dialogs]
})
export class ActivityDialogsModule {
}
