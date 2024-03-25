/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CellType, DifficultyType } from '../utils/interfaces';

export interface ScoreItemState {
  name: string;
  time: number;
  date: string;
  data: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: CellType;
  }[];
}

export interface ScoreLevelState {
  first: ScoreItemState | undefined;
  second: ScoreItemState | undefined;
  third: ScoreItemState | undefined;
}

export interface ScoreTableState {
  easy: ScoreLevelState;
  medium: ScoreLevelState;
  hard: ScoreLevelState;
}

const initialState: ScoreTableState = {
  easy: {
    first: undefined,
    second: undefined,
    third: undefined,
  },
  medium: {
    first: undefined,
    second: undefined,
    third: undefined,
  },
  hard: {
    first: undefined,
    second: undefined,
    third: undefined,
  },
};

export const scoreTableSlice = createSlice({
  name: 'scoreTable',
  initialState,
  reducers: {
    updateScoreTable: (
      state,
      action: {
        payload: { difficulty: DifficultyType; data: ScoreItemState; place: number };
      }
    ) => {
      const { place, data, difficulty } = action.payload;
      switch (place) {
        case 1:
          state[difficulty].third = state.easy.second;
          state[difficulty].second = state.easy.first;
          state[difficulty].first = data;
          break;
        case 2:
          state[difficulty].third = state.easy.second;
          state[difficulty].second = data;
          break;
        case 3:
          state[difficulty].third = data;
          break;
        default:
          break;
      }
    },

    resetScoreTable: (state) => {
      state.easy = initialState.easy;
      state.hard = initialState.hard;
      state.medium = initialState.medium;
    },
  },
});

export const { resetScoreTable, updateScoreTable } = scoreTableSlice.actions;
export default scoreTableSlice.reducer;
