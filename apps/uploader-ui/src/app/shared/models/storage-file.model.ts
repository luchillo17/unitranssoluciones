export interface IStorageFile extends Partial<File> {
  id?: string;
  path: string;
  uploadPath: string;
  isUploaded: boolean;
}
