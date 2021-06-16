import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { produce } from 'immer';

// Define a type for the slice state
interface SelectedFilesState {
  files: File[];
}

// Define the initial state using that type
const initialState: SelectedFilesState = {
  files: [],
};

export const selectedFilesSlice = createSlice({
  name: 'uploadedFiles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addFile: produce((state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    }),
    removeFile: produce(
      (state: SelectedFilesState, action: PayloadAction<File>) => {
        state.files = state.files.filter(
          (file) => file.name !== action.payload.name
        );
      }
    ),
  },
});

export const { addFile, removeFile } = selectedFilesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedFiles = (state: RootState) =>
  state.selectedFiles.files;

export const selectedFilesReducer = selectedFilesSlice.reducer;
