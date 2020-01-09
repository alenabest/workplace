import * as dayJs from 'dayjs';

export function serializeType<T>(object: T) {
  return function() {
    return object;
  };
}

export function formatDateToPlain(fullFormat?: boolean) {
  if (fullFormat) {
    return value => value ? dayJs(value) : value;
  }

  return value => value ? dayJs(value).format('YYYY-MM-DD') : value;
}

export function formatDateToClass() {
  return value => value ? dayJs(value, {locale: 'ru'}) : value;
}
