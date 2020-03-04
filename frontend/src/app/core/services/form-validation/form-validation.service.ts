import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() {
  }

  getValidatorErrorMessage(field: AbstractControl) {
    const config = {
      required: 'Обязательное поле',
      email: 'Поле должно содержать email',
      maxLength: '',
      minLength: '',
      matDatepickerMin: '',
      matDatepickerMax: '',
      minTime: '',
      maxTime: '',
      min: '',
      max: ''
    };

    if (field.hasError('required')) {
      return config.required;
    } else if (field.hasError('email')) {
      return config.email;
    } else if (field.hasError('maxlength')) {
      config.maxLength = `Максимум ${field.errors.maxlength.requiredLength} символов`;

      return config.maxLength;
    } else if (field.hasError('minlength')) {
      config.minLength = `Минимум ${field.errors.minlength.requiredLength} символов`;

      return config.minLength;
    } else if (field.hasError('matDatepickerMin')) {
      config.matDatepickerMin = `Минимальное значение - ${field.errors.matDatepickerMin.min.format('DD.MM.YYYY')}`;

      return config.matDatepickerMin;
    } else if (field.hasError('matDatepickerMax')) {
      config.matDatepickerMax = `Максимальное значение - ${field.errors.matDatepickerMax.max.format('DD.MM.YYYY')}`;

      return config.matDatepickerMax;
    } else if (field.hasError('min')) {
      config.min = `Минимальное значение - ${field.errors.min.min}`;

      return config.min;
    } else if (field.hasError('max')) {
      config.max = `Максимальное значение - ${field.errors.max.max}`;

      return config.max;
    } else if (field.hasError('minTime')) {
      config.min = `Не раньше ${field.errors.minTime}`;

      return config.min;
    } else if (field.hasError('maxTime')) {
      config.max = `Не позже ${field.errors.maxTime}`;

      return config.max;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
