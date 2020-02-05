import { NgModule } from '@angular/core';

import { ConfirmationDialogComponent } from './confirmation-dialog';
import { CoreModule } from '../../../core';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';


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
