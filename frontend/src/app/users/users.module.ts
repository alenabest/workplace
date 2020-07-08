import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ValidationErrorComponentModule } from '../common/components/validation-error';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DateDistanceModule } from '../common/pipes/date-distance';
import { UsersComponent } from './users.component';
import { USERS_ROUTES } from './users.routes';
import { ConfirmationDialogModule } from '../common/dialogs/confirmation-dialog';




@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserDialogComponent
  ],
  imports: [
    RouterModule.forChild(USERS_ROUTES),
    MatCardModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ValidationErrorComponentModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    DateDistanceModule,
    MatProgressSpinnerModule,
    FormsModule,
    ConfirmationDialogModule
  ]
})
export class UsersModule {
}
