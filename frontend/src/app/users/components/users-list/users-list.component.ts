import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from '../../../common/models/user';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: UserModel[];

  constructor() { }

  ngOnInit() {
  }

}
