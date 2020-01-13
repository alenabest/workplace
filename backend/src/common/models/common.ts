export class OkTrueModel {
  ok: boolean = true;
}

export class FileUploadModel {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
