import { NgModule } from '@angular/core';

import { LoginPageComponent } from './login-page/login-page.component';
import { CoreModule, MaterialModules } from '../../core';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [LoginPageComponent]
})

export class LoginComponentsModule {

}
