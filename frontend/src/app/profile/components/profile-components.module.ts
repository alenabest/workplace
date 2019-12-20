import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CoreModule, MaterialModules } from '../../core';


@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [ProfilePageComponent]
})

export class ProfileComponentsModule {
}