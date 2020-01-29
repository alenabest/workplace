import { NgModule } from '@angular/core';

import { WeekActivityComponentsModule } from './components';


@NgModule({
  imports: [WeekActivityComponentsModule],
  exports: [WeekActivityComponentsModule]
})
export class WeekActivityModule { }
