import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivityTypeModel, DirectionModel } from '../../../models/dictionary';
import { DictionaryService } from '../../../../core/services/dictionary';
import { DictionaryParamModel } from '../../../models/params';
import { AuthService } from '../../../../core/services/auth';
import { BaseDestroy } from '../../../models/base-destroy';
import { prepareFilteredArray } from '../../../utils';


@Component({
  selector: 'activity-type-dialog',
  templateUrl: './activity-type-dialog.component.html',
  styleUrls: ['./activity-type-dialog.component.scss']
})
export class ActivityTypeDialogComponent extends BaseDestroy implements OnInit {
  directions$: Observable<DirectionModel[]>;

  title: string = 'Создание';
  userId: number;

  activityTypeForm: FormGroup = this.getActivityTypeForm();

  get name() {
    return this.activityTypeForm.get('name');
  }

  get direction() {
    return this.activityTypeForm.get('direction');
  }

  constructor(private dialogRef: MatDialogRef<ActivityTypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public activityType: ActivityTypeModel,
              private readonly dictionaryService: DictionaryService,
              private readonly authService: AuthService,
              private formBuilder: FormBuilder) {
    super();
    this.userId = this.authService.currentUser.id;
    if (this.activityType) {
      this.title = 'Редактирование';
    } else {
      this.activityType = new ActivityTypeModel(this.userId);
    }
  }

  ngOnInit(): void {
    this.getDirections();
    this.activityTypeForm.patchValue(this.activityType);
  }

  getDirections(search?: string) {
    this.directions$ = this.getDictionary('direction', search);
  }

  getActivityTypeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      direction: [null]
    });
  }

  saveProject() {
    this.createOrUpdateProject()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  createOrUpdateProject(): Observable<ActivityTypeModel> {
    if (this.activityType.id) {
      return this.dictionaryService.updateDictionary('activity-type', this.activityType.id, this.activityTypeForm.value);
    }

    return this.dictionaryService.createDictionary('activity-type', this.activityTypeForm.value);
  }

  getDictionary(api: string, search: string): Observable<DirectionModel[]> {
    return this.dictionaryService.getDictionary(api, DirectionModel, this.generateParams(search))
      .pipe(
        map(response => response.results),
        map(results => prepareFilteredArray(results, 'id', this.direction.value))
      );
  }

  generateParams(search: string): DictionaryParamModel {
    return new DictionaryParamModel(this.userId, null, null, search);
  }
}
