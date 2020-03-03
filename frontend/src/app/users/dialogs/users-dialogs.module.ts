import { NgModule } from '@angular/core';

import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { BaseDialogMaterialModules, CoreModule } from '../../core';
import { ValidationErrorComponentModule } from '../../common/components/validation-error';


const dialogs = [
  UserDialogComponent,
];

@NgModule({
  declarations: [dialogs],
  imports: [
    BaseDialogMaterialModules,
    CoreModule,
    ValidationErrorComponentModule
  ],
  exports: [dialogs]
})
export class UsersDialogsModule { }
