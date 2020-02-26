import { NgModule } from '@angular/core';

import { ValidationErrorComponentModule } from '../../components/validation-error';
import { BaseDialogMaterialModules, CoreModule } from '../../../core';
import { ProjectDialogComponent } from './component';



@NgModule({
  declarations: [ProjectDialogComponent],
  imports: [
    ValidationErrorComponentModule,
    BaseDialogMaterialModules,
    CoreModule
  ],
  exports: [ProjectDialogComponent]
})
export class ProjectDialogModule { }
