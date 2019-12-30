import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      login: ['', Validators.required],
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
