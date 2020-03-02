import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponentsModule } from './components';
import { USERS_ROUTES } from './users.routes';



@NgModule({
  imports: [
    UsersComponentsModule,
    RouterModule.forChild(USERS_ROUTES)
  ],
  exports: [UsersComponentsModule]
})
export class UsersModule { }
