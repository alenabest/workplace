import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { UserModel } from '../../../shared/models/user';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  currentUser: UserModel;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
  }

}
