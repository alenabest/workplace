import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponentsModule } from './components';
import { USERS_ROUTES } from './users.routes';
import { UsersDialogsModule } from './dialogs';


const modules = [
  UsersComponentsModule,
  UsersDialogsModule
];

@NgModule({
  imports: [
    RouterModule.forChild(USERS_ROUTES),
    modules
  ],
  exports: [modules]
})
export class UsersModule {
}
