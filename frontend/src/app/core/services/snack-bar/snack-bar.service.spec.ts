import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MatSnackBar, Overlay]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
});
