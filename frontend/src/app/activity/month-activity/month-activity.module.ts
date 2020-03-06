import { NgModule } from '@angular/core';

import { MonthActivityComponentsModule } from './components';


@NgModule({
  imports: [MonthActivityComponentsModule],
  exports: [MonthActivityComponentsModule]
})
export class MonthActivityModule {
}
