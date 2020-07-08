import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ValidationErrorComponentModule } from '../common/components/validation-error';
import { MonthActivityCardComponent, MonthActivityComponent } from './month-activity';
import { ConfirmationDialogModule } from '../common/dialogs/confirmation-dialog';
import { WeekActivityCardComponent, WeekActivityComponent } from './week-activity';
import { DayActivityCardComponent, DayActivityComponent } from './day-activity';
import { DictionarySelectModule } from '../common/components/dictionary-select';
import { ViewActivityDialogComponent } from './view-activity-dialog';
import { DateFormatPipeModule } from '../common/pipes/date-format';
import { ActivityDialogComponent } from './activity-dialog';
import { ActivityHeaderComponent } from './activity-header';
import { ActivityComponent } from './activity.component';
import { ActivityMenuComponent } from './activity-menu';
import { ACTIVITY_ROUTES } from './activity.routes';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivityHeaderComponent,
    ActivityMenuComponent,
    DayActivityComponent,
    DayActivityCardComponent,
    MonthActivityComponent,
    MonthActivityCardComponent,
    WeekActivityComponent,
    WeekActivityCardComponent,
    ActivityDialogComponent,
    ViewActivityDialogComponent,
  ],
  imports: [
    RouterModule.forChild(ACTIVITY_ROUTES),
    CommonModule,
    FlexModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ValidationErrorComponentModule,
    MatInputModule,
    DictionarySelectModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DateFormatPipeModule,
    ConfirmationDialogModule
  ]
})
export class ActivityModule { }
