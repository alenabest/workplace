import { NgModule } from '@angular/core';

import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { BaseDialogMaterialModules, CoreModule } from '../../core';
import { ValidationErrorComponentModule } from '../../common/components/validation-error';
import {MatIconModule} from '@angular/material/icon';


const dialogs = [
  UserDialogComponent,
];

@NgModule({
  declarations: [dialogs],
    imports: [
        BaseDialogMaterialModules,
        CoreModule,
        ValidationErrorComponentModule,
        MatIconModule
    ],
  exports: [dialogs]
})
export class UsersDialogsModule { }
