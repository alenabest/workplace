import { Injectable, Injector } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { BaseDestroy } from '../../../shared/models/base-destroy';
import { AuthService } from '../auth';


@Injectable({
  providedIn: 'root'
})

export class StartupService extends BaseDestroy {

  constructor(private injector: Injector) {
    super();
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
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.checkCurrentStates(event.url);
        }
      });
  }

  checkCurrentStates(currentUrl: string) {
    const router = this.injector.get(Router);
    if (currentUrl === '' || currentUrl === '/') {
      router.navigate(['app', 'profile']).then();
    }
  }
}
