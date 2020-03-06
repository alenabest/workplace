import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  getActivitySubject: Subject<boolean> = new Subject<boolean>();
  getDictionarySubject: Subject<string> = new Subject<string>();
  getReportsSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
