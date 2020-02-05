import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DirectionModel, ProjectModel } from '../../../models/dictionary';
import { DictionaryService } from '../../../../core/services/dictionary';
import { DictionaryParamModel } from '../../../models/params';
import { AuthService } from '../../../../core/services/auth';
import { BaseDestroy } from '../../../models/base-destroy';
import { prepareFilteredArray } from '../../../utils';

@Component({
  selector: 'direction-dialog',
  templateUrl: './direction-dialog.component.html',
  styleUrls: ['./direction-dialog.component.scss']
})
export class DirectionDialogComponent extends BaseDestroy implements OnInit {
  projects$: Observable<ProjectModel[]>;

  title: string = 'Создание';
  userId: number;

  directionForm: FormGroup = this.getDirectionForm();

  get name() {
    return this.directionForm.get('name');
  }

  get project() {
    return this.directionForm.get('project');
  }

  constructor(private dialogRef: MatDialogRef<DirectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public direction: DirectionModel,
              private readonly dictionaryService: DictionaryService,
              private readonly authService: AuthService,
              private formBuilder: FormBuilder) {
    super();
    this.userId = this.authService.currentUser.id;
    if (this.direction) {
      this.title = 'Редактирование';
    } else {
      this.direction = new DirectionModel(this.userId);
    }
    console.log(this.direction);
  }

  ngOnInit(): void {
    this.getProjects();
    this.directionForm.patchValue(this.direction);
  }

  getProjects(search?: string) {
    this.projects$ = this.getDictionary('project', search);
  }

  getDirectionForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      project: [null]
    });
  }

  saveProject() {
    this.createOrUpdateProject()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  createOrUpdateProject(): Observable<DirectionModel> {
    if (this.direction.id) {
      return this.dictionaryService.updateDictionary('direction', this.direction.id, this.directionForm.value);
    }

    return this.dictionaryService.createDictionary('direction', this.directionForm.value);
  }

  getDictionary(api: string, search: string): Observable<ProjectModel[]> {
    return this.dictionaryService.getDictionary(api, ProjectModel, this.generateParams(search))
      .pipe(
        map(response => response.results),
        map(results => prepareFilteredArray(results, 'id', this.project.value))
      );
  }

  generateParams(search: string): DictionaryParamModel {
    return new DictionaryParamModel(this.userId, null, null, search);
  }
}
