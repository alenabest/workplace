import { NgModule } from '@angular/core';
import { DateDistancePipe } from './pipe/date-distance.pipe';


@NgModule({
  declarations: [DateDistancePipe],
  exports: [DateDistancePipe]
})
export class DateDistanceModule {
}
