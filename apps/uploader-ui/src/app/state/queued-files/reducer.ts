import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { produce } from 'immer';
import { IStorageFile } from '../../shared/models/storage-file.model';

// Define a type for the slice state
interface QueuedFilesState {
  files: IStorageFile[];
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
    addQueuedFile: produce(
      (state: QueuedFilesState, action: PayloadAction<IStorageFile>) => {
        state.files.push(action.payload);
      }
    ),
    removeQueuedFile: produce(
      (state: QueuedFilesState, action: PayloadAction<File>) => {
        state.files = state.files.filter(
          (file) => file.name !== action.payload.name
        );
      }
    ),
  },
});

export const { addQueuedFile, removeQueuedFile } = queuedFilesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectQueuedFiles = (state: RootState) => state.queuedFiles.files;

export const queuedFilesReducer = queuedFilesSlice.reducer;
