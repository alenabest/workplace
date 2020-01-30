import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ActivityModel } from '../../../common/models/activity';

@Component({
  selector: 'view-activity-dialog',
  templateUrl: './view-activity-dialog.component.html',
  styleUrls: ['./view-activity-dialog.component.scss']
})
export class ViewActivityDialogComponent {

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<ViewActivityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public activity: ActivityModel) {
  }
}
