import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth';
import { ProjectModel } from '../../../models/dictionary';
import { BaseDestroy } from '../../../models/base-destroy';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DictionaryService } from '../../../../core/services/dictionary';


@Component({
  selector: 'project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent extends BaseDestroy {
  title: string = 'Создание';
  userId: number;

  projectForm: FormGroup = this.getProjectForm();

  get name() {
    return this.projectForm.get('name');
  }

  constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
              private readonly dictionaryService: DictionaryService,
              private readonly authService: AuthService,
              private formBuilder: FormBuilder) {
    super();
    this.userId = this.authService.currentUser.id;
    if (this.project) {
      this.title = 'Редактирование';
    } else {
      this.project = new ProjectModel(this.userId);
    }

    this.projectForm.patchValue(this.project);
  }

  getProjectForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      user: [null]
    });
  }

  saveProject() {
    this.createOrUpdateProject()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  createOrUpdateProject(): Observable<ProjectModel> {
    if (this.project.id) {
      return this.dictionaryService.updateDictionary('project', this.project.id, this.projectForm.value);
    }

    return this.dictionaryService.createDictionary('project', this.projectForm.value);
  }
}
