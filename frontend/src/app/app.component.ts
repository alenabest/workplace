import { Component } from '@angular/core';
import { Router } from '@angular/router';


const WITHOUT_SIDEBAR_HEADER_URL: string[] = [
  '/login'
];

const WITHOUT_SIDEBAR_URL: string[] = [
  '/reports'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get isWithoutSidebarHeaderState(): boolean {
    return WITHOUT_SIDEBAR_HEADER_URL.includes(this.router.url);
  }

  get isWithoutSidebarState(): boolean {
    return WITHOUT_SIDEBAR_URL.includes(this.router.url);
  }

  constructor(private router: Router) {
    if (!localStorage['authorization']) {
      this.router.navigate(['login']).then();
    }
  }
}
