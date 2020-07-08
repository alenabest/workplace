import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EditOptionModule } from '../../directives/edit-dictionary-option';
import { ValidationErrorComponentModule } from '../validation-error';
import { ActivityTypeDialogComponent } from './activity-type-dialog';
import { FirstUppercaseModule } from '../../pipes/first-uppercase';
import { DirectionDialogComponent } from './direction-dialog';
import { ProjectDialogComponent } from './project-dialog';
import { DictionarySelectComponent } from './component';
import { CoreModule } from '../../../core';



@NgModule({
  declarations: [
    DictionarySelectComponent,
    ProjectDialogComponent,
    ActivityTypeDialogComponent,
    DirectionDialogComponent
  ],
  exports: [
    DictionarySelectComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    CoreModule,
    MatButtonModule,
    EditOptionModule,
    MatIconModule,
    ValidationErrorComponentModule,
    FirstUppercaseModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,

  ]
})
export class DictionarySelectModule { }
