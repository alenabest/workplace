import {format} from 'date-fns';

export function serializeType<T>(object: T) {
  return function() {
    return object;
  };
}

export function formatDateToPlain(fullFormat?: boolean) {
  if (fullFormat) {
    return value => value ? new Date(value) : value;
  }

  return value => value ? format(new Date(value), 'YYYY-MM-DD') : value;
}

export function formatDateToClass() {
  return value => value ? new Date(value) : value;
}
