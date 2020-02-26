import { NgModule } from '@angular/core';

import { ValidationErrorComponentModule } from '../../components/validation-error';
import { DictionarySelectModule } from '../../components/dictionary-select';
import { BaseDialogMaterialModules, CoreModule } from '../../../core';
import { DirectionDialogComponent } from './component';



@NgModule({
  declarations: [DirectionDialogComponent],
  imports: [
    ValidationErrorComponentModule,
    BaseDialogMaterialModules,
    DictionarySelectModule,
    CoreModule,
  ],
  exports: [DirectionDialogComponent]
})
export class DirectionDialogModule { }
