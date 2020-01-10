import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseDestroy } from '../../../shared/models/base-destroy';
import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user';
import { UserModel } from '../../../shared/models/user';


@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent extends BaseDestroy implements OnInit {
  profileForm: FormGroup;
  currentUser: UserModel;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService) {
    super();

    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
    this.profileForm = this.initForm();
    this.profileForm.patchValue(this.currentUser);
  }

  cancelEdit() {
    this.profileForm.patchValue(this.currentUser);
  }

  saveProfile() {
    this.userService.updateUser(this.currentUser.id, this.profileForm.value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
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
