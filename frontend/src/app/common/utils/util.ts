import { HttpParams } from '@angular/common/http';
import { SimpleChange } from '@angular/core';
import { format } from 'date-fns';


export function addLocalStorageItem(key: string, value: string, reset?: boolean) {
  if (reset) {
    localStorage.clear();
  }
  localStorage.setItem(key, value);
}

export function getRandomElement<T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)];
}

export function generateQuery(params: object): HttpParams {
  if (!params) {
    return null;
  }

  params = clearNullFields(params);

  let newParams: HttpParams = new HttpParams();
  Object.keys(params).forEach(key => newParams = newParams.append(key, params[key]));

  return newParams;
}

export function isEmptyObject(obj) {
  return !(obj && Object.keys(obj).length > 0);
}

export function clearNullFields(clearingObject: object): object {
  const newObject = clearingObject;
  Object.keys(newObject).forEach(key => {
    if (!newObject[key]) {
      delete newObject[key];
    }
  });

  return newObject;
}

export function getTimeMessage(time: string, type: string, status: string): string {
  if (time) {
    return `Время ${type} должно быть не ${status} ${time}.`;
  }

  return '';
}

export function compareDates(date1: Date, date2: Date): boolean {
  return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
}

export function dateInDiapason(date: Date, start: Date, end: Date): boolean {
  const currentDate = format(date, 'yyyy-MM-dd');
  return currentDate >= format(start, 'yyyy-MM-dd') && currentDate <= format(end, 'yyyy-MM-dd');
}

export function isOnChange(change: SimpleChange): boolean {
  return change && change.currentValue && change.currentValue !== change.previousValue;
}
