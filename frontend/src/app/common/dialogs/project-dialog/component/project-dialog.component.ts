import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { DictionaryService } from '../../../../core/services/dictionary';
import { ProjectModel } from '../../../models/dictionary';
import { LoginService } from '../../../../login';


@UntilDestroy()
@Component({
  selector: 'project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnDestroy{
  title: string = 'Создание';
  userId: number;

  projectForm: FormGroup;

  get name() {
    return this.projectForm.get('name');
  }

  constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
              private readonly dictionaryService: DictionaryService,
              private readonly loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.userId = this.loginService.currentUser.id;
    if (this.project) {
      this.title = 'Редактирование';
    } else {
      this.project = new ProjectModel(this.userId);
    }
    this.projectForm = this.getProjectForm();
    this.projectForm.patchValue(this.project);
  }

  ngOnDestroy() {
  }

  getProjectForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  saveProject() {
    this.createOrUpdateProject()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.dialogRef.close(true));
  }

  createOrUpdateProject(): Observable<ProjectModel> {
    if (this.project.id) {
      return this.dictionaryService.updateDictionary('project', this.project.id, this.projectForm.value);
    }

    return this.dictionaryService.createDictionary('project', this.projectForm.value);
  }
}
