import { format } from 'date-fns';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';


export class IResponse<T> {
  constructor(public count: number,
              public next: string,
              public previous: string,
              public results: Array<T>,
              public all?: number) {
  }
}

export function serializeResponse<T>(cls: ClassType<T>, response: IResponse<T>): IResponse<T> {
    response.results = plainToClass(cls, response.results);

    return response;
}

export function formatDateToPlain(fullFormat?: boolean) {
  if (fullFormat) {
    return value => value ? new Date(value) : value;
  }

  return value => value ? format(new Date(value), 'yyyy-MM-dd') : value;
}

export function formatDateToClass() {
  return value => value ? new Date(value) : value;
}

export function formatMedia() {
  return value => value ? value.replace('media/', '') : value;
}

export function prepareObject(clsObject, plain) {
  const object = plainToClass(clsObject, plain);

  return classToPlain(object);
}
