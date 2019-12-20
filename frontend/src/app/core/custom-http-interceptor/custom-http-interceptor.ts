import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { SnackBarService } from '../services/snack-bar';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private snackBarService: SnackBarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = this._beforeRequest(request);
    let response;
    return next.handle(request)
      .pipe(
        catchError(error => {
          this._showErrorMessage(error);

          return throwError(error);
        }),
        tap(res => response = res),
        finalize(() => this._afterRequest(response))
      );
  }

  private _beforeRequest(request: HttpRequest<any>): HttpRequest<any> {
    // ToDo: сделать полосу загрузки
    return this._fromStorageToHeader(request);
  }

  private _showErrorMessage(error: HttpErrorResponse) {
    const status = error.status;
    if (status === 401) {
      this._redirectToLoginPage();
    } else if (status === 403) {
      this.snackBarService
        .openSnackBar('У вас недостаточно прав, чтобы выполнить данное действие', '-warning');
    } else if (status === 503) {
      this.snackBarService
        .openSnackBar('На сервере ведутся технические работы. Попробуйте позднее.');
    } else if (status >= 400) {
      this.snackBarService
        .openSnackBar(this._prepareMessage(error), '-warning');
    }
  }

  private _afterRequest(response?: HttpResponse<any>) {
    // ToDo: сделать полосу загрузки
  }

  private _redirectToLoginPage() {
    localStorage.clear();
    this.router.navigate(['login']).then();
  }

  protected _fromStorageToHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authorizationToken: string = localStorage.getItem('authorization');

    if (authorizationToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authorizationToken
        }
      });
    }

    return request;
  }

  protected _prepareMessage(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }

    return error.message;
  }
}
