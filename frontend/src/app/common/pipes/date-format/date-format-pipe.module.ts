import { NgModule } from '@angular/core';

import { DateFormatPipe } from './pipe';


@NgModule({
  declarations: [DateFormatPipe],
  exports: [DateFormatPipe]
})

export class DateFormatPipeModule {
}
