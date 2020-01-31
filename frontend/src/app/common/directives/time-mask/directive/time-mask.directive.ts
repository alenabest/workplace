import { Directive, ElementRef, OnDestroy } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
  selector: '[timeMask]'
})
export class TimeMaskDirective implements OnDestroy {
  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];

  maskInputController;

  constructor(private element?: ElementRef) {
    this.maskInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.timeMask,
      guide: false
    });
  }

  ngOnDestroy(): void {
    this.maskInputController.destroy();
  }
}
