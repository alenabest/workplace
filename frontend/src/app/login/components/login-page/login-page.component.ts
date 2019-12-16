import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../core/services/form-validation/form-validation.service';


@Component({
  selector: 'app-login-page',
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
              private formValidationService: FormValidationService) {
  }

  getValidatorErrorMessage(field: AbstractControl): string {
    return this.formValidationService.getValidatorErrorMessage(field);
  }

  ngOnInit() {
    this.initForm();
  }

  login() {
    console.log(this.loginForm.value);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
