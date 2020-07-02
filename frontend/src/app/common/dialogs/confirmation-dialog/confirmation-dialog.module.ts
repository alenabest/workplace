import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './component';
import { CoreModule } from '../../../core';


@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CoreModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule {
}
