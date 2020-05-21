import {Component, HostListener, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {MatDialogRef} from '@angular/material';

import {FormValidationService} from '../../../core/services/form-validation';
import {SnackBarService} from '../../../core/services/snack-bar';
import {AuthService} from '../../../core/services/auth';


@Component({
  selector: 'change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnDestroy {

  changePasswordForm: FormGroup = this.getChangePasswordForm();
  oldPasswordHide: boolean = true;
  newPasswordHide: boolean = true;
  repeatPasswordHide: boolean = true;

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm ? this.changePasswordForm.get('newPassword') : null;
  }

  get repeatPassword() {
    return this.changePasswordForm.get('repeatPassword');
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private formValidationService: FormValidationService,
              private snackBarService: SnackBarService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnDestroy(): void {
  }

  getValidationMessage(control: AbstractControl): string {
    return this.formValidationService.getValidatorErrorMessage(control);
  }

  checkFormAndChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.formValidationService.validateAllFormFields(this.changePasswordForm);
    } else {
      this.changePassword();
    }
  }

  changePassword() {
    this.authService.changePassword(this.changePasswordForm.value)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => this.completeChanges());
  }

  completeChanges() {
    this.snackBarService.success('Пароль изменён');
    this.dialogRef.close();
  }

  getChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
