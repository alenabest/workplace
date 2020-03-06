import { Route } from '@angular/router';

import { ProfilePageComponent } from './components/profile-page';


export const PROFILE_ROUTES: Route[] = [
  {
    path: 'app/profile',
    component: ProfilePageComponent
  }
];
