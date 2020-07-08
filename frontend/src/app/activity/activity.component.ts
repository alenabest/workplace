import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent  {

  constructor(private router: Router) {
    this.router.navigate(['app', 'activity', 'day']).then();
  }
}
