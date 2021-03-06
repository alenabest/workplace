import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassType } from 'class-transformer/ClassTransformer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, switchMap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ActivityTypeModel, DirectionModel, ProjectModel } from '../../../common/models/dictionary';
import { CustomValidators } from '../../../core/services/form-validation/custom-validators';
import { ActivityModel, ActivityValidation } from '../../../common/models/activity';
import { getTimeMessage, prepareFilteredArray } from '../../../common/utils';
import { DictionaryService } from '../../../core/services/dictionary';
import { DictionaryParam } from '../../../common/models/params';
import { SnackBarService } from '../../../core/services/snack-bar';
import { SubjectService } from '../../../core/services/subject';
import { ActivityDialogService } from './activity-dialog.service';
import { LoginService } from '../../../login';


@UntilDestroy()
@Component({
  selector: 'activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit, OnDestroy {
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
              private readonly activityDialogService: ActivityDialogService,
              private readonly subjectService: SubjectService,
              private readonly loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.userId = this.loginService.currentUser.id;
    if (this.activity.id) {
      this.title = 'Редактирование';
    }
    this.subscribeToSubject();
  }

  ngOnDestroy() {
  }

  subscribeToSubject() {
    this.subjectService.getDictionarySubject
      .pipe(untilDestroyed(this))
      .subscribe(result => this.subjectAction(result));
  }

  subjectAction(result: string) {
    switch (result) {
      case 'project':
        this.getProjects();
        break;
      case 'direction':
        this.getDirections();
        break;
      case 'activity-type':
        this.getActivityTypes();
        break;
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

  checkTimes() {
    if (this.start.value && this.end.value) {
      if (this.start.value > this.end.value) {
        this.start.setErrors({maxTime: this.end.value});
      } else if (this.end.value < this.start.value) {
        this.end.setErrors({minTime: this.start.value});
      } else {
        this.end.updateValueAndValidity();
        this.start.updateValueAndValidity();
      }
    }
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

  getProjects(search?: string) {
    this.projects$ = this.getDictionary('project', ProjectModel, search);
  }

  getDirections(search?: string) {
    this.directions$ = this.getDictionary('direction', DirectionModel, search);
  }

  getActivityTypes(search?: string) {
    this.activityTypes$ = this.getDictionary('activity-type', ActivityTypeModel, search);
  }

  saveActivity() {
    this.validateActivity()
      .pipe(
        switchMap(result => this.checkValidationResultAndSave(result)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeSave());
  }

  checkValidationResultAndSave(result: ActivityValidation): Observable<ActivityModel> {
    if (result.ok) {
      return this.createOrUpdateActivity();
    }
    this.openSnackBar(result);
    return of();
  }

  completeSave() {
    this.dialogRef.close(true);
  }

  openSnackBar(result: ActivityValidation) {
    const startMessage: string = getTimeMessage(result.start, 'начала', 'раньше');
    const endMessage: string = getTimeMessage(result.end, 'окончания', 'позже');
    this.snackBarService.warning(`${startMessage} ${endMessage}`);
  }

  validateActivity(): Observable<ActivityValidation> {
    return this.activityDialogService.validateActivity(this.activityForm.value);
  }

  createOrUpdateActivity(): Observable<ActivityModel> {
    if (this.activity.id) {
      return this.updateActivity();
    }
    return this.createActivity();
  }

  createActivity(): Observable<ActivityModel> {
    return this.activityDialogService.createActivity(this.activityForm.value);
  }

  updateActivity(): Observable<ActivityModel> {
    return this.activityDialogService.updateActivity(this.activity.id, this.activityForm.value);
  }

  getDictionary<T>(api: string, cls: ClassType<T>, search: string): Observable<T[]> {
    return this.dictionaryService.getDictionary<T>(api, cls, this.generateParams(search))
      .pipe(
        map(response => response.results),
        map(results => this.prepareDictionary(results, api))
      );
  }

  prepareDictionary<T>(results: T[], api: string): T[] {
    switch (api) {
      case 'project':
        return prepareFilteredArray(results, 'id', this.project.value);
      case 'direction':
        return prepareFilteredArray(results, 'id', this.direction.value);
      case 'activity-type':
        return prepareFilteredArray(results, 'id', this.type.value);
    }
  }

  generateParams(search: string): DictionaryParam {
    const projects = this.project.value ? this.project.value.id : null;
    const directions = this.direction.value ? this.direction.value.id : null;
    return new DictionaryParam(this.userId, projects, directions, search);
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
