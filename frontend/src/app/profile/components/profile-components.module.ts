import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CoreModule, MaterialModules } from '../../core';
import { ProfileAwatarComponent } from './profile-awatar/profile-awatar.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileAwatarComponent,
    ProfileCardComponent
  ],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [ProfilePageComponent]
})

export class ProfileComponentsModule {
}
