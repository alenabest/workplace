import { NgModule } from '@angular/core';

import { ProfileComponentsModule } from './components/profile-components.module';
import { RouterModule } from '@angular/router';
import { PROFILE_ROUTES } from './profile.routes';


@NgModule({
  imports: [
    ProfileComponentsModule,
    RouterModule.forChild(PROFILE_ROUTES)
  ],
  exports: [ProfileComponentsModule]
})
export class ProfileModule {
}
