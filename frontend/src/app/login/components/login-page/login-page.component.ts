import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormValidationService } from '../../../core/services/form-validation/';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private formBuilder: FormBuilder,
              private formValidationService: FormValidationService,
              private authService: AuthService) {
    localStorage.clear();
  }

  getValidatorErrorMessage(field: AbstractControl): string {
    return this.formValidationService.getValidatorErrorMessage(field);
  }

  ngOnInit() {
    this.initForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe();
    } else {
      this.formValidationService.validateAllFormFields(this.loginForm);
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
