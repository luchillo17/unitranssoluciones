import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { produce } from 'immer';

// Define a type for the slice state
interface UploadedFilesState {
  files: File[];
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
    addFile: produce((state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    }),
    removeFile: produce(
      (state: UploadedFilesState, action: PayloadAction<File>) => {
        state.files = state.files.filter(
          (file) => file.name !== action.payload.name
        );
      }
    ),
  },
});

export const { addFile, removeFile } = uploadedFilesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const uploadedSelectedFiles = (state: RootState) =>
  state.uploadedFiles.files;

export const uploadedFilesReducer = uploadedFilesSlice.reducer;
