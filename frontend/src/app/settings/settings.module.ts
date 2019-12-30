import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponentsModule } from './components/settings-components.module';
import { SETTINGS_ROUTES } from './settings.routes';



@NgModule({
  imports: [
    SettingsComponentsModule,
    RouterModule.forChild(SETTINGS_ROUTES)
  ],
  exports: [SettingsComponentsModule]
})
export class SettingsModule { }
