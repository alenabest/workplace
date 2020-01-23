import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivityModel } from '../../../common/models/activity';


@Component({
  selector: 'activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit {
  title: string = 'Создание';
  activityForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public activity: ActivityModel,
              private formBuilder: FormBuilder) {
    if (this.activity.id) {
      this.title = 'Редактирование';
    }
  }

  ngOnInit() {
    this.activityForm = this.getActivityForm();
    this.activityForm.patchValue(this.activity);
  }

  getActivityForm(): FormGroup {
    return this.formBuilder.group({
      activityDate: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: ['', Validators.required],
      project: [null],
      direction: [null],
      type: [null],
      task: [null]
    });
  }
}
