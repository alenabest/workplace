import {format} from 'date-fns';
import {classToPlain, plainToClass} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';


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

export function formatObjectToField<T, K extends keyof T>(field: K) {
  return value => value ? value[field] : value;
}

export function formatMedia() {
  return value => value ? value.replace('media/', '') : value;
}

export function prepareObject<T>(clsObject: ClassType<T>, plain) {
  const object = plainToClass(clsObject, plain);
  return classToPlain(object);
}

export function formatDateToBacked(value: Date) {
  return format(value, 'yyyy-MM-dd');
}

export function prepareAndDownloadFile(response: any, type: string, filenameRegex: RegExp = /"(.*?)"/): Blob {
  const contentDispositionHeader = decodeURIComponent(response.headers.get('content-disposition'));
  const splitContentDispositionHeader = contentDispositionHeader.split('; ');

  let filename: string;
  if (splitContentDispositionHeader.length === 2) {
    filename = filenameRegex.exec(splitContentDispositionHeader[1])[1];
  } else {
    filename = splitContentDispositionHeader[2].slice(17, );
  }

  const fileURL = URL.createObjectURL(response.body);
  const anchor = document.createElement('a');
  document.body.appendChild(anchor);
  anchor.download = filename;
  anchor.href = fileURL;
  anchor.target = '_self';
  anchor.click();
  anchor.remove();

  return new Blob([response.body], {type});
}
