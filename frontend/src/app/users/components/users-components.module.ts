import { NgModule } from '@angular/core';

import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { DateDistanceModule } from '../../common/pipes/date-distance';
import { CoreModule, MaterialModules } from '../../core';
import { UsersPageComponent } from './users-page';
import { UsersListComponent } from './users-list';



@NgModule({
  declarations: [
    UsersPageComponent,
    UsersListComponent
  ],
  imports: [
    CoreModule,
    MaterialModules,
    DateDistanceModule
  ],
  exports: [UsersPageComponent],
  entryComponents: [UserDialogComponent]
})

export class UsersComponentsModule { }
