import { NgModule } from '@angular/core';

import { ValidationErrorComponent } from './component/validation-error.component';
import { CoreModule } from '../../../core';
import { MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [ValidationErrorComponent],
  imports: [
    CoreModule,
    MatFormFieldModule
  ],
  exports: [ValidationErrorComponent]
})
export class ValidationErrorComponentModule {
}
