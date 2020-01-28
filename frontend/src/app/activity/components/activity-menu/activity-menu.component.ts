import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { DateValue } from '../../data';


@Component({
  selector: 'activity-menu',
  templateUrl: './activity-menu.component.html',
  styleUrls: ['./activity-menu.component.scss']
})
export class ActivityMenuComponent {
  @Input() isNotToday: boolean;

  @Output() checkTodayEvent = new EventEmitter<DateValue>();

  state: string;

  constructor(private readonly router: Router) {
    this.state = this.getState();
  }

  navigateTo(state: string) {
    this.router.navigate(['app', 'activity', state]).then();
  }

  checkToday() {
    this.checkTodayEvent.emit({ value: new Date() });
  }

  getState(): string {
    if (this.router.url.length > 0) {
      return this.router.url.split('/').reverse()[0];
    }

    return '';
  }
}
