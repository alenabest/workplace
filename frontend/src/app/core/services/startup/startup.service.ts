import { Injectable, Injector, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../auth';


@UntilDestroy()
@Injectable({
  providedIn: 'root'
})

export class StartupService implements OnDestroy {

  constructor(private injector: Injector) {
  }

  ngOnDestroy() {
  }

  initializeApp() {
    const authService = this.injector.get(AuthService);

    return authService.getProfile()
      .toPromise()
      .then(() => this.getCurrentStates())
      .catch(() => Promise.resolve());
  }

  getCurrentStates() {
    const router = this.injector.get(Router);

    router.events
      .pipe(untilDestroyed(this))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.checkCurrentStates(event.url);
        }
      });
  }

  checkCurrentStates(currentUrl: string) {
    const router = this.injector.get(Router);
    if (currentUrl === '' || currentUrl === '/') {
      router.navigate(['app', 'activity', 'day']).then();
    }
  }
}
