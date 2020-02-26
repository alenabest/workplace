import { NgModule } from '@angular/core';
import { ActivityTypeDialogComponent } from './component';
import { BaseDialogMaterialModules, CoreModule } from '../../../core';
import { ValidationErrorComponentModule } from '../../components/validation-error';
import { DictionarySelectModule } from '../../components/dictionary-select';



@NgModule({
  declarations: [ActivityTypeDialogComponent],
  imports: [
    BaseDialogMaterialModules,
    CoreModule,
    ValidationErrorComponentModule,
    DictionarySelectModule
  ],
  exports: [ActivityTypeDialogComponent]
})
export class ActivityTypeDialogModule { }
