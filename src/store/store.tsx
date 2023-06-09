import { configureStore } from '@reduxjs/toolkit';
import formReducer from './FormSlice';
import gameCycleReducer from './GameCycleSlice';
import pressedCellsReducer from './PressedCellsSlice';

export const store = configureStore({
  reducer: {
    formData: formReducer,
    gameCycle: gameCycleReducer,
    pressedCells: pressedCellsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
