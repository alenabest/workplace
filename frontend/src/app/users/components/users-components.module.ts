import { NgModule } from '@angular/core';
import { CoreModule, MaterialModules } from '../../core';
import { UsersPageComponent } from './users-page/users-page.component';



@NgModule({
  declarations: [UsersPageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [UsersPageComponent]
})

export class UsersComponentsModule { }
