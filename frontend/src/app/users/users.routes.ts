import { Route } from '@angular/router';

import { UsersComponent } from './users.component';


export const USERS_ROUTES: Route[] = [
  {
    path: 'app/users',
    component: UsersComponent
  }
];
