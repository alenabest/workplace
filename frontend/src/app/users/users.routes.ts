import { Route } from '@angular/router';

import { UsersPageComponent } from './components/users-page/users-page.component';


export const USERS_ROUTES: Route[] = [
  {
    path: 'app/users',
    component: UsersPageComponent
  }
];
