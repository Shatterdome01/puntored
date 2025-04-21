import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import referenceReducer from './referenceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    references: referenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
