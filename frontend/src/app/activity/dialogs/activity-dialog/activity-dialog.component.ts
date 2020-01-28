import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassType } from 'class-transformer/ClassTransformer';
import { MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivityTypeModel, DictionaryParamModel, DirectionModel, ProjectModel } from '../../../common/models/dictionary';
import { CustomValidators } from '../../../core/services/form-validation/custom-validators';
import { DictionaryService } from '../../../core/services/dictionary';
import { ActivityModel } from '../../../common/models/activity';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit {
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

  constructor(@Inject(MAT_DIALOG_DATA) public activity: ActivityModel,
              private readonly dictionaryService: DictionaryService,
              private readonly authService: AuthService,
              private formBuilder: FormBuilder) {
    this.userId = this.authService.currentUser.id;
    if (this.activity.id) {
      this.title = 'Редактирование';
    }
  }

  ngOnInit() {
    this.activityForm.patchValue(this.activity);
    this.getDictionaries();
  }

  getDictionaries() {
    const params = new DictionaryParamModel(this.userId);
    this.getProjects(params);
    this.getDirections(params);
    this.getActivityTypes(params);
  }

  filterDirections() {
    const params = new DictionaryParamModel(this.userId, this.project.value);
    this.getDirections(params);
    this.getActivityTypes(params);
  }

  filterActivityTypes() {
    const params = new DictionaryParamModel(this.userId, this.project.value, this.direction.value);
    this.getActivityTypes(params);
  }

  getProjects(params: DictionaryParamModel) {
    this.projects$ = this.getDictionary('project', ProjectModel, params);
  }

  getDirections(params: DictionaryParamModel) {
    this.directions$ = this.getDictionary('direction', DirectionModel, params);
  }

  getActivityTypes(params: DictionaryParamModel) {
    this.activityTypes$ = this.getDictionary('activity-type', ActivityTypeModel, params);
  }

  getDictionary<T>(api: string, cls: ClassType<T>, params?: any): Observable<T[]> {
    return this.dictionaryService.getDictionary<T>(api, cls, params)
      .pipe(
        map(response => response.results)
      );
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
