import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { ActivityDialogComponent } from '../dialogs/activity-dialog';
import { ActivityMenuComponent } from './activity-menu';
import { AddActivityComponent } from './add-activity';
import { ActivityDialogsModule } from '../dialogs';
import { CoreModule } from '../../core';

const components = [
  ActivityMenuComponent,
  AddActivityComponent
];

@NgModule({
  declarations: [components],
  imports: [
    ActivityDialogsModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
  ],
  entryComponents: [ActivityDialogComponent],
  exports: [components]
})

export class ActivityComponentsModule {}

