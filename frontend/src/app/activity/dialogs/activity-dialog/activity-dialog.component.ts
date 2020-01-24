import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivityModel } from '../../../common/models/activity';
import { CustomValidators } from '../../../core/services/form-validation/custom-validators';


@Component({
  selector: 'activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit {
  title: string = 'Создание';

  activityForm: FormGroup = this.getActivityForm();

  get activityDate() { return this.activityForm.get('activityDate'); }
  get start() { return this.activityForm.get('start'); }
  get end() { return this.activityForm.get('end'); }
  get description() { return this.activityForm.get('description'); }
  get project() { return this.activityForm.get('project'); }
  get direction() { return this.activityForm.get('direction'); }
  get type() { return this.activityForm.get('type'); }
  get task() { return this.activityForm.get('task'); }

  constructor(@Inject(MAT_DIALOG_DATA) public activity: ActivityModel,
              private formBuilder: FormBuilder) {
    if (this.activity.id) {
      this.title = 'Редактирование';
    }
  }

  ngOnInit() {
    this.activityForm.patchValue(this.activity);
  }

  getActivityForm(): FormGroup {
    return this.formBuilder.group({
      activityDate: ['', Validators.required],
      start: ['', [Validators.required, CustomValidators.timePattern]],
      end: ['', [Validators.required, CustomValidators.timePattern]],
      description: ['', Validators.required],
      project: [null],
      direction: [null],
      type: [null],
      task: [null]
    });
  }
}
