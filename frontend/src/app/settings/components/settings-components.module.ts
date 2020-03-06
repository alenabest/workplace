import { NgModule } from '@angular/core';

import { CoreModule, MaterialModules } from '../../core';
import { SettingsPageComponent } from './settings-page';


@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [SettingsPageComponent]
})

export class SettingsComponentsModule {
}
