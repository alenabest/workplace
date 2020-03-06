import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { RoleModel, UserModel } from '../../../common/models/user';
import { UserService } from '../../../core/services/user';
import { map, share } from 'rxjs/operators';


@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  roles$: Observable<RoleModel[]>;

  userForm: FormGroup;

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get role() {
    return this.userForm.get('role');
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: UserModel,
              private readonly userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getRoles();
    this.userForm = this.getUserForm();
    this.userForm.patchValue(this.user);
  }

  getRoles() {
    this.roles$ = this._getRoles()
      .pipe(
        share()
      );
  }

  _getRoles(): Observable<RoleModel[]> {
    return this.userService.getRoles()
      .pipe(
        map(response => response.results)
      );
  }

  getUserForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: [null, [Validators.required]],
      id: [null],
    });
  }
}
