import { HttpParams } from '@angular/common/http';


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
  let newParams: HttpParams = new HttpParams();
  Object.keys(params).forEach(key => newParams = newParams.append(key, params[key]));

  return newParams;
}
