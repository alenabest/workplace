import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private successStyle = 'custom-snack-bar';
  private warningStyle = 'custom-snack-bar-warning';

  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.snackBar.open('', message, {duration: 10000, panelClass: this.successStyle, horizontalPosition: 'center'});
  }

  warning(message: string) {
    this.snackBar.open('', message, {duration: 10000, panelClass: this.warningStyle, horizontalPosition: 'center'});
  }
}
