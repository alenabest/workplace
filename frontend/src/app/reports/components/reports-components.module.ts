import { NgModule } from '@angular/core';

import { ReportsPageComponent } from './reports-page';
import { ReportsCardComponent } from './reports-card';
import { CoreModule } from '../../core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportContainerComponent } from './report-container/report-container.component';
import { DateFormatPipeModule } from '../../common/pipes/date-format';
import { MonthFieldModule } from '../../common/components/month-field';


@NgModule({
  declarations: [
    ReportsPageComponent,
    ReportsCardComponent,
    ReportContainerComponent
  ],
  imports: [
    CoreModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DateFormatPipeModule,
    MonthFieldModule
  ],
  exports: [ReportsPageComponent]
})
export class ReportsComponentsModule {
}
