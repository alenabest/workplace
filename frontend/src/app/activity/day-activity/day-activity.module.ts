import { NgModule } from '@angular/core';

import { DayActivityComponentsModule } from './components';


@NgModule({
  imports: [DayActivityComponentsModule],
  exports: [DayActivityComponentsModule]
})
export class DayActivityModule {
}
