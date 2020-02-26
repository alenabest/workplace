import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

import { RouterStub } from '../../../common/models/router-stub';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClient,
      HttpHandler,
      {provide: Router, useClass: RouterStub}
      ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
