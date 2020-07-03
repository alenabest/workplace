import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { SETTINGS_ROUTES } from './settings.routes';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    RouterModule.forChild(SETTINGS_ROUTES),
    CommonModule
  ],
})
export class SettingsModule { }
