import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassType } from 'class-transformer/ClassTransformer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ActivityTypeModel, DirectionModel, ProjectModel } from '../../../common/models/dictionary';
import { CustomValidators } from '../../../core/services/form-validation/custom-validators';
import { ActivityModel, ActivityValidation } from '../../../common/models/activity';
import { DictionaryService } from '../../../core/services/dictionary';
import { DictionaryParamModel } from '../../../common/models/params';
import { SnackBarService } from '../../../core/services/snack-bar';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { ActivityService } from '../../../core/services/activity';
import { AuthService } from '../../../core/services/auth';
import { getTimeMessage } from '../../../common/utils';


@Component({
  selector: 'activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent extends BaseDestroy implements OnInit {
  title: string = 'Создание';

  userId: number;

  activityForm: FormGroup = this.getActivityForm();

  projects$: Observable<ProjectModel[]>;
  directions$: Observable<DirectionModel[]>;
  activityTypes$: Observable<ActivityTypeModel[]>;

  get activityDate() {
    return this.activityForm.get('activityDate');
  }

  get start() {
    return this.activityForm.get('start');
  }

  get end() {
    return this.activityForm.get('end');
  }

  get description() {
    return this.activityForm.get('description');
  }

  get project() {
    return this.activityForm.get('project');
  }

  get direction() {
    return this.activityForm.get('direction');
  }

  get type() {
    return this.activityForm.get('type');
  }

  get task() {
    return this.activityForm.get('task');
  }

  constructor(private dialogRef: MatDialogRef<ActivityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public activity: ActivityModel,
              private readonly dictionaryService: DictionaryService,
              private readonly snackBarService: SnackBarService,
              private readonly activityService: ActivityService,
              private readonly authService: AuthService,
              private formBuilder: FormBuilder) {
    super();
    this.userId = this.authService.currentUser.id;
    if (this.activity.id) {
      this.title = 'Редактирование';
    }
  }

  defaultEqual(dir1: any, dir2: any): boolean {
    if (dir1 && dir2) {
      return dir1.id === dir2.id;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.activityForm.patchValue(this.activity);
    this.getDictionaries();
  }

  getDictionaries() {
    this.getProjects();
    this.getDirections();
    this.getActivityTypes();
  }

  selectProject() {
    this.getDirections();
    this.getActivityTypes();
  }

  selectDirection() {
    this.getActivityTypes();
  }

  getProjects() {
    this.projects$ = this.getDictionary('project', ProjectModel);
  }

  getDirections() {
    this.directions$ = this.getDictionary('direction', DirectionModel);
  }

  getActivityTypes() {
    this.activityTypes$ = this.getDictionary('activity-type', ActivityTypeModel);
  }

  saveActivity() {
    this.validateActivity()
      .pipe(
        switchMap(result => {
          if (result.ok) {
            return this.createOrUpdateActivity();
          }
          this.openSnackBar(result);
          return of();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.completeSave());
  }

  completeSave() {
    this.dialogRef.close(this.activityDate.value);
  }

  openSnackBar(result: ActivityValidation) {
    const startMessage: string = getTimeMessage(result.start, 'начала', 'раньше');
    const endMessage: string = getTimeMessage(result.end, 'окончания', 'позже');
    this.snackBarService.openSnackBar(`${startMessage} ${endMessage}`, '-warning');
  }

  validateActivity(): Observable<ActivityValidation> {
    return this.activityService.validateActivity(this.activityForm.value);
  }

  createOrUpdateActivity(): Observable<ActivityModel> {
    if (this.activity.id) {
      return this.updateActivity();
    }
    return this.createActivity();
  }

  createActivity(): Observable<ActivityModel> {
    return this.activityService.createActivity(this.activityForm.value);
  }

  updateActivity(): Observable<ActivityModel> {
    return this.activityService.updateActivity(this.activity.id, this.activityForm.value);
  }

  getDictionary<T>(api: string, cls: ClassType<T>): Observable<T[]> {
    return this.dictionaryService.getDictionary<T>(api, cls, this.generateParams())
      .pipe(
        map(response => response.results)
      );
  }

  generateParams(): DictionaryParamModel {
    const projects = this.project.value ? this.project.value.id : null;
    const directions = this.direction.value ? this.direction.value.id : null;
    return new DictionaryParamModel(this.userId, projects, directions);
  }

  getActivityForm(): FormGroup {
    return this.formBuilder.group({
      activityDate: [null, Validators.required],
      start: ['', [Validators.required, CustomValidators.timePattern]],
      end: ['', [Validators.required, CustomValidators.timePattern]],
      description: ['', Validators.required],
      project: [null],
      direction: [null],
      type: [null],
      task: [null],
      id: [null]
    });
  }
}
