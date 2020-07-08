import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {getHours} from 'date-fns';

import { LoginService } from '../login';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userFirstName: string = 'Пользователь';

  get greetingWords(): string {
    const nowHour: number = getHours(new Date());
    if (nowHour >= 5 && nowHour < 10) {
      return 'Доброе утро, ';
    } else if (nowHour >= 10 && nowHour < 18) {
      return 'Добрый день, ';
    } else if (nowHour >= 18 && nowHour < 23) {
      return 'Добрый вечер, ';
    } else if (nowHour >= 23 && nowHour < 5) {
      return 'Доброй ночи, ';
    }
  }

  constructor(private loginService: LoginService,
              private router: Router) {
    if (this.loginService.currentUser.firstName) {
      this.userFirstName = this.loginService.currentUser.firstName;
    }
  }

  ngOnInit() {
  }

  isState(state: string): boolean {
    return this.router.url.includes(`/${state}`);
  }

  logout() {
    this.loginService.logout();
  }
}
