import { format } from 'date-fns';
import { classToPlain, plainToClass } from 'class-transformer';


export function serializeType<T>(object: T) {
  return function() {
    return object;
  };
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

export function prepareObject(clsObject, plain) {
  const object = plainToClass(clsObject, plain);

  return classToPlain(object);
}
