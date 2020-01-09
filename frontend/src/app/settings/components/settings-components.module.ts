import { NgModule } from '@angular/core';

import { SettingsPageComponent } from './settings-page/settings-page.component';
import { CoreModule, MaterialModules } from '../../core';


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
