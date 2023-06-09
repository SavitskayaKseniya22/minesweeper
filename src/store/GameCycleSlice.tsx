/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface GameCycleSettingsState {
  isGameStarted: boolean;
  isGameFinished: false | 'win' | 'lose';
}

export interface GameCycleState {
  settings: GameCycleSettingsState;
}

const initialState: GameCycleState = {
  settings: {
    isGameStarted: false,
    isGameFinished: false,
  },
};

export const gameCycleSlice = createSlice({
  name: 'gameCycle',
  initialState,
  reducers: {
    updateStartGameStatus: (
      state,
      action: {
        payload: boolean;
      }
    ) => {
      state.settings.isGameStarted = action.payload;
    },
    updateFinishGameStatus: (
      state,
      action: {
        payload: false | 'win' | 'lose';
      }
    ) => {
      state.settings.isGameFinished = action.payload;
    },
    updateBothGameStatuses: (
      state,
      action: {
        payload: GameCycleSettingsState;
      }
    ) => {
      state.settings = action.payload;
    },
  },
});

export const { updateStartGameStatus, updateFinishGameStatus, updateBothGameStatuses } =
  gameCycleSlice.actions;
export default gameCycleSlice.reducer;
