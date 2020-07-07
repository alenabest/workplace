import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {Observable, of} from 'rxjs';

import {FormValidationService} from '../core/services/form-validation';
import { LoginService } from './login.service';
import { UserModel } from '../server-api';


@UntilDestroy()
@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup = this.initForm();
  hide: boolean = true;

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private formBuilder: FormBuilder,
              private formValidationService: FormValidationService,
              private loginService: LoginService) {
    localStorage.clear();
  }

  ngOnDestroy(): void {
  }

  getValidatorErrorMessage(field: AbstractControl): string {
    return this.formValidationService.getValidatorErrorMessage(field);
  }

  login() {
    this.checkFormAndLogin()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
  }

  checkFormAndLogin(): Observable<UserModel> {
    if (this.loginForm.invalid) {
      this.formValidationService.validateAllFormFields(this.loginForm);

      return of();
    }
    return this.loginService.login(this.loginForm.value);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
