import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { MaterialModules } from '../../core/material.modules';


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
