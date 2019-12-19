import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MaterialModules } from '../../core/material.modules';
import { CoreModule } from '../../core/core.module';


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
