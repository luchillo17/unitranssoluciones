import unionBy from 'lodash-es/unionBy';

import { IStorageFile } from '../models/storage-file.model';

export function mapFileListToArray(fileList: FileList): Array<File> {
  const files: File[] = [];

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    files.push(file);
  }

  return files;
}

export function mergeFileArrays(
  fileArr1: IStorageFile[],
  fileArr2: IStorageFile[]
): IStorageFile[] {
  return unionBy(fileArr1, fileArr2, 'name');
}

// export function getFilesRecursive(path: string) {}
