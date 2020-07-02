import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivityTypeModel, DirectionModel } from '../../../models/dictionary';
import { DictionaryService } from '../../../../core/services/dictionary';
import { DictionaryParam } from '../../../models/params';
import { prepareFilteredArray } from '../../../utils';
import { LoginService } from '../../../../login';


@UntilDestroy()
@Component({
  selector: 'activity-type-dialog',
  templateUrl: './activity-type-dialog.component.html',
  styleUrls: ['./activity-type-dialog.component.scss']
})
export class ActivityTypeDialogComponent implements OnInit, OnDestroy {
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
              private readonly loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.userId = this.loginService.currentUser.id;
    if (this.activityType) {
      this.title = 'Редактирование';
    } else {
      this.activityType = new ActivityTypeModel(this.userId);
    }
  }

  ngOnDestroy() {
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
      .pipe(untilDestroyed(this))
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

  generateParams(search: string): DictionaryParam {
    return new DictionaryParam(this.userId, null, null, search);
  }
}
