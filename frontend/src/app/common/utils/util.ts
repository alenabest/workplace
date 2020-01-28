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
