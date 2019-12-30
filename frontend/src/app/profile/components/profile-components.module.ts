import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CoreModule, MaterialModules } from '../../core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileCardComponent,
    ProfileAvatarComponent
  ],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [ProfilePageComponent]
})

export class ProfileComponentsModule {
}
