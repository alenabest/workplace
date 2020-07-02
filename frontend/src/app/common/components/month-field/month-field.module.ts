import { NgModule } from '@angular/core';

import { MonthFieldComponent } from './component';
import { CoreModule } from '../../../core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



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
