import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

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
