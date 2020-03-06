import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponentsModule } from './components';
import { PROFILE_ROUTES } from './profile.routes';
import { ProfileDialogsModule } from './dialogs';


const modules = [
  ProfileComponentsModule,
  ProfileDialogsModule
];

@NgModule({
  imports: [
    modules,
    RouterModule.forChild(PROFILE_ROUTES)
  ],
  exports: [
    modules
  ]
})
export class ProfileModule {
}
