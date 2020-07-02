import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DirectionModel, ProjectModel } from '../../../models/dictionary';
import { DictionaryService } from '../../../../core/services/dictionary';
import { DictionaryParam } from '../../../models/params';
import { prepareFilteredArray } from '../../../utils';
import { LoginService } from '../../../../login';


@UntilDestroy()
@Component({
  selector: 'direction-dialog',
  templateUrl: './direction-dialog.component.html',
  styleUrls: ['./direction-dialog.component.scss']
})
export class DirectionDialogComponent implements OnInit, OnDestroy {
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
              private readonly loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.userId = this.loginService.currentUser.id;
    if (this.direction) {
      this.title = 'Редактирование';
    } else {
      this.direction = new DirectionModel(this.userId);
    }
  }

  ngOnDestroy() {
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
      .pipe(untilDestroyed(this))
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

  generateParams(search: string): DictionaryParam {
    return new DictionaryParam(this.userId, null, null, search);
  }
}
