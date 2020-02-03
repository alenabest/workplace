import { NgModule } from '@angular/core';

import { ValidationErrorComponentModule } from '../../components/validation-error';
import { CoreModule, MaterialModules } from '../../../core';
import { ProjectDialogComponent } from './component';



@NgModule({
  declarations: [ProjectDialogComponent],
  imports: [
    CoreModule,
    MaterialModules,
    ValidationErrorComponentModule
  ],
  exports: [ProjectDialogComponent]
})
export class ProjectDialogModule { }
