import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../shared/models/user';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: UserModel;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
    this.profileForm = this.initForm();
    this.profileForm.patchValue(this.currentUser);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      birthday: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      phone: [''],
    });
  }
}
