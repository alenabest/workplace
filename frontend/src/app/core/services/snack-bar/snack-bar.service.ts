import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  snackBarStyle = 'custom-snack-bar';

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, style: string = '') {
    style = this.snackBarStyle + style;
    this.snackBar.open(message, '', {duration: 10000, panelClass: style});
  }
}
