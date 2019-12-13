import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponentsModule } from './components/login-components.module';
import { LOGIN_ROUTES } from './login.routes';


@NgModule({
  imports: [
    LoginComponentsModule,
    RouterModule.forRoot(LOGIN_ROUTES)
  ],
  exports: [LoginComponentsModule]
})

export class LoginModule {

}
