import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ActivityTypeDialogComponent } from '../../../dialogs/activity-type-dialog/component';
import { DirectionDialogComponent } from '../../../dialogs/direction-dialog/component';
import { ProjectDialogComponent } from '../../../dialogs/project-dialog/component';
import { DictionaryService } from '../../../../core/services/dictionary';
import { SubjectService } from '../../../../core/services/subject';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Directive({
  selector: '[editOption]'
})
export class EditOptionDirective implements OnDestroy {
  @Input() editOption: object;
  @Input() editOptionApi: string;

  @HostListener('click') onKeyUp() {
    this.getOpenedDialog()
      .pipe(untilDestroyed(this))
      .subscribe(result => this.completeClose(result));
  }

  constructor(private readonly dictionaryService?: DictionaryService,
              private readonly subjectService?: SubjectService,
              private dialog?: MatDialog) {
  }

  ngOnDestroy() {
  }

  completeClose(result: boolean) {
    if (result) {
      this.subjectService.getDictionarySubject.next(this.editOptionApi);
    }
  }

  getOpenedDialog(): Observable<boolean> {
    switch (this.editOptionApi) {
      case 'project':
        return this.dialog.open(ProjectDialogComponent, {data: this.editOption, disableClose: false})
          .afterClosed();
      case 'direction':
        return this.dialog.open(DirectionDialogComponent, {data: this.editOption, disableClose: false})
          .afterClosed();
      case 'activity-type':
        return this.dialog.open(ActivityTypeDialogComponent, {data: this.editOption, disableClose: false})
          .afterClosed();
    }
  }
}
