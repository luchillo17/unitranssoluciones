import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { produce } from 'immer';
import { IStorageFile } from '../../shared/models/storage-file.model';

// Define a type for the slice state
interface FilesState {
  queuedFiles: IStorageFile[];
  selectedFiles: IStorageFile[];
  uploadedFiles: IStorageFile[];
}

// Define the initial state using that type
const initialState: FilesState = {
  queuedFiles: [],
  selectedFiles: [],
  uploadedFiles: [],
};

const addFileByType = (type: keyof FilesState) =>
  produce((state: FilesState, action: PayloadAction<IStorageFile>) => {
    if (!state[type].some((stateFile) => stateFile.id === action.payload.id)) {
      state[type].push(action.payload);
    }
  });

const addFilesByType = (type: keyof FilesState) =>
  produce((state: FilesState, action: PayloadAction<IStorageFile[]>) => {
    state[type].push(
      ...action.payload.filter(
        (file) =>
          !state.selectedFiles.some((stateFile) => file.id === stateFile.id)
      )
    );
  });

const removeFileByType = (type: keyof FilesState) =>
  produce((state: FilesState, action: PayloadAction<IStorageFile>) => {
    state[type] = state.selectedFiles.filter(
      (file) => file.name !== action.payload.name
    );
  });
export const filesSlice = createSlice({
  name: 'files',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addSelectedFile: addFileByType('selectedFiles'),
    addSelectedFiles: addFilesByType('selectedFiles'),
    removeSelectedFile: removeFileByType('selectedFiles'),
  },
});

export const {
  addSelectedFile,
  addSelectedFiles,
  removeSelectedFile,
} = filesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectQueuedFiles = (state: RootState) =>
  state.files.selectedFiles;

export const selectSelectedFiles = (state: RootState) =>
  state.files.selectedFiles;

export const selectUploadedFiles = (state: RootState) =>
  state.files.selectedFiles;

export const filesReducer = filesSlice.reducer;
