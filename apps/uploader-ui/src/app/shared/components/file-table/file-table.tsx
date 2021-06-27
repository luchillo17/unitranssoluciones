import {
  Button,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { ReactNode } from 'react';

import { IStorageFile } from '../../models/storage-file.model';
import styles from './file-table.module.scss';

/* eslint-disable-next-line */
export interface FileTableProps {
  data: IStorageFile[];
  deleteFileClickHandler: (file: IStorageFile) => void;
}

export interface FileColumn {
  field?: keyof IStorageFile;
  headerName: string;
  type?: string;
  renderCell?: (row: IStorageFile) => ReactNode;
}

export function FileTable(props: FileTableProps) {
  const columns: FileColumn[] = [
    { field: 'name', headerName: 'Nombre' },
    { field: 'uploadPath', headerName: 'Ruta de Subida' },
    {
      field: 'isUploaded',
      headerName: 'Archivo Subido',
      type: 'boolean',
    },
    {
      headerName: 'Acciones',
      renderCell: (row) => (
        <div className={styles.actionContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              props.deleteFileClickHandler(row);
            }}
          >
            <Icon>delete</Icon>
          </Button>
        </div>
      ),
    },
  ];

  const renderCellValue = (row: IStorageFile, column: FileColumn) => {
    if (column.renderCell) {
      return column.renderCell(row);
    }

    if (!column.field) {
      return null;
    }

    if (column.type === 'boolean') {
      return row[column.field] ? (
        <CheckIcon></CheckIcon>
      ) : (
        <CloseIcon></CloseIcon>
      );
    }

    return row[column.field];
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns &&
              columns.map((column) => (
                <TableCell key={'header_' + column.field}>
                  {column.headerName}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              {columns &&
                columns.map((column) => (
                  <TableCell
                    key={`${row.id}_${column.field}`}
                    component="th"
                    scope="row"
                  >
                    {renderCellValue(row, column)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FileTable;
