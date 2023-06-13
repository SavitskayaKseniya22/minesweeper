/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface GameCycleState {
  isGameStarted: boolean;
  isGameFinished: false | 'win' | 'lose';
  isItRecord: { place: number } | false;
}

const initialState: GameCycleState = {
  isGameStarted: false,
  isGameFinished: false,
  isItRecord: false,
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
    updateIsItRecord: (
      state,
      action: {
        payload: { place: number };
      }
    ) => {
      state.isItRecord = action.payload;
    },

    resetGameCycle: (state) => {
      state.isGameFinished = initialState.isGameFinished;
      state.isGameStarted = initialState.isGameStarted;
      state.isItRecord = initialState.isItRecord;
    },
  },
});

export const { updateStartGameStatus, updateIsItRecord, resetGameCycle, updateFinishGameStatus } =
  gameCycleSlice.actions;
export default gameCycleSlice.reducer;
