import { NgModule } from '@angular/core';
import { PhoneMaskDirective } from './directive/phone-mask.directive';


@NgModule({
  declarations: [PhoneMaskDirective],
  exports: [PhoneMaskDirective]
})
export class PhoneMaskDirectiveModule {
}
