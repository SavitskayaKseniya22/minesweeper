/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface GameCycleState {
  isGameStarted: boolean;
  isGameFinished: false | 'win' | 'lose';
}

const initialState: GameCycleState = {
  isGameStarted: false,
  isGameFinished: false,
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
      state.isGameStarted = action.payload;
    },
    updateFinishGameStatus: (
      state,
      action: {
        payload: false | 'win' | 'lose';
      }
    ) => {
      state.isGameFinished = action.payload;
    },

    resetGameCycle: (state) => {
      state.isGameFinished = initialState.isGameFinished;
      state.isGameStarted = initialState.isGameStarted;
    },
  },
});

export const { updateStartGameStatus, resetGameCycle, updateFinishGameStatus } =
  gameCycleSlice.actions;
export default gameCycleSlice.reducer;
