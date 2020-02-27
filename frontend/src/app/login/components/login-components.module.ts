import { NgModule } from '@angular/core';

import { CoreModule, MaterialModules } from '../../core';
import { LoginPageComponent } from './login-page';


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
