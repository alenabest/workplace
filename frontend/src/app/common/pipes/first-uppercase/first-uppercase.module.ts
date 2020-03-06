import { NgModule } from '@angular/core';

import { FirstUppercasePipe } from './pipe';



@NgModule({
  declarations: [FirstUppercasePipe],
  exports: [FirstUppercasePipe]
})
export class FirstUppercaseModule { }
