import { Route } from '@angular/router';

import { SettingsPageComponent } from './components/settings-page/settings-page.component';


export const SETTINGS_ROUTES: Route[] = [
  {
    path: 'app/settings',
    component: SettingsPageComponent
  }
];
