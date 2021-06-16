import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { queuedFilesReducer } from './queued-files/reducer';
import { selectedFilesReducer } from './selected-files/reducer';
import { uploadedFilesReducer } from './uploaded-files/reducer';

export const store = configureStore({
  reducer: {
    queuedFiles: queuedFilesReducer,
    selectedFiles: selectedFilesReducer,
    uploadedFiles: uploadedFilesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
