import { NgModule } from '@angular/core';

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
    MaterialModules
  ],
  exports: [UsersPageComponent]
})

export class UsersComponentsModule { }
