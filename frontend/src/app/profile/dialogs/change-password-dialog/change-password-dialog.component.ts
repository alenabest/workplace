import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

import { FormValidationService } from '../../../core/services/form-validation';
import { SnackBarService } from '../../../core/services/snack-bar';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent extends BaseDestroy implements OnInit {

  changePasswordForm: FormGroup;

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private formValidationService: FormValidationService,
              private snackBarService: SnackBarService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    super();
  }

  getValidationMessage(control: AbstractControl): string {
    return this.formValidationService.getValidatorErrorMessage(control);
  }

  ngOnInit() {
    this.changePasswordForm = this.getChangePasswordForm();
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
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.completeChanges());
  }

  completeChanges() {
    this.snackBarService.openSnackBar('Пароль изменён');
    this.dialogRef.close();
  }

  getChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
