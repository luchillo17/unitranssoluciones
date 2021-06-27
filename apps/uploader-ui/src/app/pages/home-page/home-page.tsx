import { Button, Card, CardContent, Paper, TextField } from '@material-ui/core';
import { ChangeEventHandler, createRef, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FileTable from '../../shared/components/file-table/file-table';
import { IStorageFile } from '../../shared/models/storage-file.model';
import {
  mapFileListToArray,
  mergeFileArrays,
} from '../../shared/services/fs-service';
import {
  addSelectedFiles,
  removeSelectedFile,
  selectSelectedFiles,
} from '../../state/files/reducer';
import styles from './home-page.module.scss';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const fileInputRef = createRef<HTMLInputElement>();

  const selectedFiles = useSelector(selectSelectedFiles);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    files: [] as IStorageFile[],
    uploadPath: '',
  });

  const fileInputOpenHandler = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const fileSelectedHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const fileInput = e.target;
    if (fileInput.files === null) {
      return;
    }

    const files = mapFileListToArray(fileInput.files) as IStorageFile[];

    setFormState({
      ...formState,
      files: mergeFileArrays(formState.files, files),
    });
  };

  const uploadPathChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    setFormState({
      ...formState,
      uploadPath: e.target.value,
    });
  };

  const addFilesToList = () => {
    const { files, uploadPath } = formState;

    dispatch(
      addSelectedFiles(
        files.map<IStorageFile>((file) => ({
          id: file.name,
          name: file.name,
          path: file.path,
          uploadPath,
          isUploaded: false,
        }))
      )
    );

    clearForm();
  };

  const clearForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setFormState({ files: [], uploadPath: '' });
  };

  const deleteFile = (file: IStorageFile) => {
    dispatch(removeSelectedFile(file));
  };

  return (
    <Paper className={styles.homeContainer}>
      <h1>Subir archivo</h1>

      <Card>
        <CardContent className={styles.cardContainer}>
          <input
            ref={fileInputRef}
            hidden
            type="file"
            name="file"
            onChange={fileSelectedHandler}
            multiple
          />

          <TextField
            className={styles.filesField}
            label="Archivos"
            type="text"
            variant="outlined"
            value={formState.files.map((file) => file.name).join(', ')}
            onClick={fileInputOpenHandler}
            onKeyDown={fileInputOpenHandler}
          ></TextField>

          <TextField
            className={styles.pathField}
            label="Ruta de Subida"
            variant="outlined"
            value={formState.uploadPath}
            onChange={uploadPathChangeHandler}
          ></TextField>

          <Button
            className={styles.addButton}
            variant="contained"
            color="primary"
            onClick={addFilesToList}
          >
            Añadir archivos
          </Button>

          <Button
            className={styles.clearButton}
            variant="contained"
            color="secondary"
            onClick={clearForm}
          >
            Limpiar
          </Button>

          <Button className={styles.uploadButton} variant="contained">
            Subir
          </Button>
        </CardContent>
      </Card>

      <FileTable
        data={selectedFiles}
        deleteFileClickHandler={deleteFile}
      ></FileTable>
    </Paper>
  );
}

export default HomePage;
