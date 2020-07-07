import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

import { ChangePasswordDialogComponent } from './change-password-dialog';
import { FormValidationService } from '../core/services/form-validation';
import { SnackBarService } from '../core/services/snack-bar';
import { UserService } from '../core/services/user';
import { UserModel } from '../server-api';
import { LoginService } from '../login';

@UntilDestroy()
@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  profileForm: FormGroup = this.initForm();
  currentUser: UserModel = this.loginService.currentUser;

  constructor(private formValidationService: FormValidationService,
              private snackBarService: SnackBarService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.profileForm.patchValue(this.currentUser);
  }

  ngOnDestroy() {
  }

  getControl(field: string): AbstractControl {
    return this.profileForm.get(field);
  }

  getValidationMessage(field: AbstractControl) {
    return this.formValidationService.getValidatorErrorMessage(field);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {width: '300px'});
  }

  cancelEdit() {
    this.profileForm.patchValue(this.currentUser);
  }

  completeActions(message: string, user: UserModel) {
    this.snackBarService.success(message);
    this.currentUser = user;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.updateUser();
    } else {
      this.formValidationService.validateAllFormFields(this.profileForm);
      this.snackBarService.warning('Обязательные поля не заполнены');
    }
  }

  updateUser() {
    this.userService.updateUser(this.currentUser.id, this.profileForm.value)
      .pipe(
        switchMap(() => this.loginService.getProfile()),
        untilDestroyed(this)
      )
      .subscribe((user) => this.completeActions('Изменения сохранены', user));
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      birthday: [null],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      phone: ['']
    });
  }
}
