import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EditOptionModule } from '../../directives/edit-dictionary-option';
import { ValidationErrorComponentModule } from '../validation-error';
import { FirstUppercaseModule } from '../../pipes/first-uppercase';
import { DictionarySelectComponent } from './component';
import { CoreModule } from '../../../core';



@NgModule({
  declarations: [DictionarySelectComponent],
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
    MatTooltipModule
  ]
})
export class DictionarySelectModule { }
