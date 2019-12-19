import { Route } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';


export const PROFILE_ROUTES: Route[] = [
  {
    path: 'app/profile',
    component: ProfilePageComponent
  }
];
