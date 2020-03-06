import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';

import { ValidationErrorComponent } from './component';
import { CoreModule } from '../../../core';


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
