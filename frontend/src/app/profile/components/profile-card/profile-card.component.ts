import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { ChangePasswordDialogComponent } from '../../dialogs/change-password-dialog';
import { FormValidationService } from '../../../core/services/form-validation';
import { SnackBarService } from '../../../core/services/snack-bar';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user';
import { UserModel } from '../../../common/models/user';


@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent extends BaseDestroy implements OnInit {
  profileForm: FormGroup;
  currentUser: UserModel;

  get username() { return this.profileForm.get('username'); }
  get firstName() { return this.profileForm.get('firstName'); }
  get middleName() { return this.profileForm.get('middleName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get birthday() { return this.profileForm.get('birthday'); }
  get email() { return this.profileForm.get('email'); }
  get mobile() { return this.profileForm.get('mobile'); }
  get phone() { return this.profileForm.get('phone'); }

  constructor(private formValidationService: FormValidationService,
              private snackBarService: SnackBarService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private dialog: MatDialog) {
    super();

    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
    this.profileForm = this.initForm();
    this.profileForm.patchValue(this.currentUser);
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
    this.snackBarService.openSnackBar(message);
    this.currentUser = user;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.updateUser();
    } else {
      this.formValidationService.validateAllFormFields(this.profileForm);
      this.snackBarService.openSnackBar('Обязательные поля не заполнены', '-warning');
    }
  }

  updateUser() {
    this.userService.updateUser(this.currentUser.id, this.profileForm.value)
      .pipe(
        switchMap(() => this.authService.getProfile()),
        takeUntil(this.destroy$)
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
