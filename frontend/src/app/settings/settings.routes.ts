import { Route } from '@angular/router';

import { SettingsPageComponent } from './components/settings-page';


export const SETTINGS_ROUTES: Route[] = [
  {
    path: 'app/settings',
    component: SettingsPageComponent
  }
];
