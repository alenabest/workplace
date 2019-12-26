import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


export class BaseDestroy implements OnDestroy {

  destroy$ = new Subject<boolean>();

  constructor() {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
