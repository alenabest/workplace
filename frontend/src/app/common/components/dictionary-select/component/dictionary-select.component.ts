import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'dictionary-select',
  templateUrl: './dictionary-select.component.html',
  styleUrls: ['./dictionary-select.component.scss']
})
export class DictionarySelectComponent implements OnDestroy {
  @Input() control: FormControl | AbstractControl;
  @Input() defaultEqual: (o1?: any, o2?: any) => boolean;
  @Input() required: boolean = false;
  @Input() dictionary: object[];
  @Input() separator: string = ' ';
  @Input() field: string;
  @Input() param: string;
  @Input() label: string;
  @Input() api: string;

  @Output() selectionChange = new EventEmitter();
  @Output() searchChange = new EventEmitter<string>();

  filterBySearch: FormControl = new FormControl();
  constructor() {
    this.subscribeFormControl();
  }

  ngOnDestroy() {
  }

  trackByFn(index, item) {
    return item.id;
  }

  subscribeFormControl() {
    this.filterBySearch.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeSearch());
  }

  changeSelect() {
    this.selectionChange.emit();
    this.filterBySearch.setValue(null);
  }

  cancelSelect() {
    this.control.setValue(null);
    this.selectionChange.emit();
  }

  changeSearch(close?: boolean) {
    if (close) {
      this.filterBySearch.setValue(null);
    }
    this.searchChange.emit(this.filterBySearch.value);
  }
}
