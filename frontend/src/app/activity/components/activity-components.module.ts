import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { ActivityDialogComponent } from '../dialogs/activity-dialog/activity-dialog.component';
import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityDialogsModule } from '../dialogs/activity-dialogs.module';
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

