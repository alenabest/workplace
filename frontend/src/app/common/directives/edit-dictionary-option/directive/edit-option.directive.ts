import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ActivityTypeDialogComponent } from '../../../components/dictionary-select/activity-type-dialog';
import { DirectionDialogComponent } from '../../../components/dictionary-select/direction-dialog';
import { ProjectDialogComponent } from '../../../components/dictionary-select/project-dialog';
import { SubjectService } from '../../../../core/services/subject';


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

  constructor(private readonly subjectService?: SubjectService,
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
