import { NgModule } from '@angular/core';

import { WeekActivityComponentsModule } from './components/components.module';



@NgModule({
  imports: [WeekActivityComponentsModule],
  exports: [WeekActivityComponentsModule]
})
export class WeekActivityModule { }
