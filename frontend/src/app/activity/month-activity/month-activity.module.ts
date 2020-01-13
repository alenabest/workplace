import { NgModule } from '@angular/core';

import { MonthActivityComponentsModule } from './components/components.module';


@NgModule({
  imports: [MonthActivityComponentsModule],
  exports: [MonthActivityComponentsModule]
})
export class MonthActivityModule {
}
