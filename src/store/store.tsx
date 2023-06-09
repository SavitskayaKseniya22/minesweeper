import { configureStore } from '@reduxjs/toolkit';
import formReducer from './FormSlice';
import gameCycleReducer from './GameCycleSlice';

export const store = configureStore({
  reducer: {
    formData: formReducer,
    gameCycle: gameCycleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
