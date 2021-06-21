import { Button, Card, CardContent, Paper, TextField } from '@material-ui/core';
import { ChangeEventHandler, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileTable } from '../../shared/components/file-table/file-table';
import {
  mapFileListToArray,
  mergeFileArrays,
} from '../../shared/services/fs-service';
import {
  addSelectedFile,
  selectSelectedFiles,
} from '../../state/selected-files/reducer';
import styles from './home-page.module.scss';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedFiles = useSelector(selectSelectedFiles);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    files: [] as File[],
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

    const files = mapFileListToArray(fileInput.files);
    console.log(fileInput.files);
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
            label="Archivos"
            type="text"
            variant="outlined"
            value={formState.files.map((file) => file.name).join(', ')}
            onClick={fileInputOpenHandler}
            onKeyDown={fileInputOpenHandler}
          ></TextField>

          <TextField
            label="Ruta de Subida"
            variant="outlined"
            onChange={uploadPathChangeHandler}
          ></TextField>

          <Button variant="contained" color="primary">
            Añadir archivos
          </Button>

          <Button variant="contained" color="secondary">
            Limpiar
          </Button>
        </CardContent>
      </Card>

      <FileTable data={selectedFiles}></FileTable>
    </Paper>
  );
}

export default HomePage;
