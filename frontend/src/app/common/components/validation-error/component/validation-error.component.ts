import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormValidationService } from '../../../../core/services/form-validation';


@Component({
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})

export class ValidationErrorComponent {
  @Input() public control: AbstractControl;

  // public errors$: Observable<string> = defer(() => this.getObservable());

  constructor(private readonly formValidationService: FormValidationService) {
  }

  getValidationMessage(field: AbstractControl) {
    return this.formValidationService.getValidatorErrorMessage(field);
  }
  //
  // getObservable(): Observable<string> {
  //   if (!this.control.value) {
  //     return of('Не заполнено');
  //   }
  //
  //   return this.control.statusChanges.pipe(
  //     map(() => this.control.errors),
  //     map((errors) => this.getDescriptions(errors))
  //   );
  // }
  //
  // getDescriptions(errors: ValidationErrors): string {
  //   if (isEmptyObject(errors)) {
  //     return '';
  //   }
  //   const errorDescriptions = [];
  //   Object.keys(errors).forEach(key => {
  //     const description = this.getDescription(key, errors[key]);
  //     if (description) {
  //       errorDescriptions.push(description);
  //     }
  //   });
  //
  //   return errorDescriptions.join(', ');
  // }
  //
  // getDescription(key: string, args: any): string {
  //   switch (key) {
  //     case 'email':
  //       return 'Поле должно содержать email';
  //     case 'min':
  //       return `Минимальное значение - ${args.min}`;
  //     case 'max':
  //       return `Минимальное значение - ${args.max}`;
  //     case 'maxlength':
  //       return `Максимум ${args.requiredLength} символов`;
  //     case 'minlength':
  //       return `Минимум ${args.requiredLength} символов`;
  //     case 'matDatepickerMax':
  //       return `Максимальное значение - ${format(args.max, 'dd.MM.yyyy')}`;
  //     case 'matDatepickerMin':
  //       return `Минимальное значение - ${format(args.min, 'dd.MM.yyyy')}`;
  //     case 'timePattern':
  //       return 'ЧЧ:ММ';
  //     case 'required':
  //       return 'Обязательное поле';
  //   }
  // }
}
