import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponentsModule } from './components/profile-components.module';
import { ProfileDialogsModule } from './dialogs/profile-dialogs.module';
import { PROFILE_ROUTES } from './profile.routes';


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
