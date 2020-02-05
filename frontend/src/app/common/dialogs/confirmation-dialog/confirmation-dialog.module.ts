import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';

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
