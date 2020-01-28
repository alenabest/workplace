import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ActivityDialogComponent } from '../../dialogs/activity-dialog/activity-dialog.component';
import { ActivityModel } from '../../../common/models/activity';

@Component({
  selector: 'add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent {
  @Input() currentDate: Date;
  constructor(private dialog: MatDialog) { }

  openActivityDialog() {
    this.dialog.open(ActivityDialogComponent, {disableClose: true, data: new ActivityModel(this.currentDate)});
  }
}
