import './file-table.module.scss';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { IStorageFile } from '../../models/storage-file.model';

/* eslint-disable-next-line */
export interface FileTableProps {
  data: IStorageFile[];
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nombre' },
  { field: 'uploadPath', headerName: 'Ruta de Subida' },
  { field: 'isUploaded', headerName: 'Archivo Subido' },
];

export function FileTable(props: FileTableProps) {
  return <DataGrid columns={columns} rows={props.data}></DataGrid>;
}

export default FileTable;
