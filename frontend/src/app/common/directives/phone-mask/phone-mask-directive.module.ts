import { NgModule } from '@angular/core';

import { PhoneMaskDirective } from './directive';


@NgModule({
  declarations: [PhoneMaskDirective],
  exports: [PhoneMaskDirective]
})
export class PhoneMaskDirectiveModule {
}
