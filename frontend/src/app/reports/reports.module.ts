import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportsComponentsModule } from './components';
import { REPORTS_ROUTES } from './reports.routes';



@NgModule({
  imports: [
    RouterModule.forChild(REPORTS_ROUTES),
    ReportsComponentsModule
  ],
  exports: [ReportsComponentsModule]
})
export class ReportsModule { }
