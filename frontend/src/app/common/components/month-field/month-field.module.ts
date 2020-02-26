import { NgModule } from '@angular/core';

import { MonthFieldComponent } from './component';
import { CoreModule } from '../../../core';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [MonthFieldComponent],
  imports: [
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  exports: [MonthFieldComponent]
})
export class MonthFieldModule { }
