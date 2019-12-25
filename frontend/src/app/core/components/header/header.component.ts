import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get greetingWords(): string {
    const nowHour: number = dayjs().hour();
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

  constructor() { }

  ngOnInit() {
  }

}
