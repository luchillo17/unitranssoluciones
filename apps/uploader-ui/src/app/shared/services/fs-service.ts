import unionBy from 'lodash-es/unionBy';

export function mapFileListToArray(fileList: FileList): Array<File> {
  const files: File[] = [];

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    files.push(file);
  }

  return files;
}

export function mergeFileArrays(fileArr1: File[], fileArr2: File[]): File[] {
  return unionBy(fileArr1, fileArr2, 'name');
}

// export function getFilesRecursive(path: string) {}
