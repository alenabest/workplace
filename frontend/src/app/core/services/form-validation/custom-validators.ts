import { ValidationErrors } from '@angular/forms';

const timeRegexp = new RegExp(/^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/);

export class CustomValidators {
  static timePattern(control): ValidationErrors | null {
    if (control.value && !timeRegexp.test(control.value)) {
      return {timePattern: true};
    }

    return null;
  }
}
