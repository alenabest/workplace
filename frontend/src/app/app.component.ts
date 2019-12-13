import { Component } from '@angular/core';
import { Router } from '@angular/router';

const WITHOUT_SIDEBAR_HEADER_URL: string[] = [
  '/login'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
    if (!localStorage['authorization']) {
      this.router.navigate(['login']).then();
    }
  }

  isWithSidebarHeaderState(): boolean {
    return WITHOUT_SIDEBAR_HEADER_URL.includes(this.router.url);
  }
}
