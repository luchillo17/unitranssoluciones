import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { produce } from 'immer';

// Define a type for the slice state
interface QueuedFilesState {
  files: File[];
}

// Define the initial state using that type
const initialState: QueuedFilesState = {
  files: [],
};

export const queuedFilesSlice = createSlice({
  name: 'queuedFiles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addFile: produce((state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    }),
    removeFile: produce(
      (state: QueuedFilesState, action: PayloadAction<File>) => {
        state.files = state.files.filter(
          (file) => file.name !== action.payload.name
        );
      }
    ),
  },
});

export const { addFile, removeFile } = queuedFilesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectQueuedFiles = (state: RootState) => state.queuedFiles.files;

export const queuedFilesReducer = queuedFilesSlice.reducer;
