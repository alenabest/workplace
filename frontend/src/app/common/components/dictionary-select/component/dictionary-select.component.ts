import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseDestroy } from '../../../models/base-destroy';


@Component({
  selector: 'dictionary-select',
  templateUrl: './dictionary-select.component.html',
  styleUrls: ['./dictionary-select.component.scss']
})
export class DictionarySelectComponent extends BaseDestroy {
  @Input() control: FormControl | AbstractControl;
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
    super();
    this.subscribeFormControl();
  }

  trackByFn(index, item) {
    return item.id;
  }

  defaultEqual(dir1: any, dir2: any): boolean {
    if (dir1 && dir2) {
      return dir1.id === dir2.id;
    } else {
      return false;
    }
  }


  subscribeFormControl() {
    this.filterBySearch.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeSearch());
  }

  changeSelect() {
    this.selectionChange.emit();
    this.filterBySearch.setValue(null);
  }

  changeSearch(close?: boolean) {
    if (close) {
      this.filterBySearch.setValue(null);
    }
    this.searchChange.emit(this.filterBySearch.value);
  }
}
