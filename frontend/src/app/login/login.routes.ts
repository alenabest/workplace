import { Route } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';


export let LOGIN_ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent
  }
];
