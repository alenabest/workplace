import { NgModule } from '@angular/core';
import { DayActivityComponentsModule } from './components/components.module';


@NgModule({
  imports: [DayActivityComponentsModule],
  exports: [DayActivityComponentsModule]
})
export class DayActivityModule {
}
