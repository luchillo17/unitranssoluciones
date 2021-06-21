import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { produce } from 'immer';
import { IStorageFile } from '../../shared/models/storage-file.model';

// Define a type for the slice state
interface UploadedFilesState {
  files: IStorageFile[];
}

// Define the initial state using that type
const initialState: UploadedFilesState = {
  files: [],
};

export const uploadedFilesSlice = createSlice({
  name: 'uploadedFiles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addUploadedFile: produce(
      (state: UploadedFilesState, action: PayloadAction<IStorageFile>) => {
        state.files.push(action.payload);
      }
    ),
    removeUploadedFile: produce(
      (state: UploadedFilesState, action: PayloadAction<IStorageFile>) => {
        state.files = state.files.filter(
          (file) => file.name !== action.payload.name
        );
      }
    ),
  },
});

export const {
  addUploadedFile,
  removeUploadedFile,
} = uploadedFilesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const uploadedSelectedFiles = (state: RootState) =>
  state.uploadedFiles.files;

export const uploadedFilesReducer = uploadedFilesSlice.reducer;
