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

export type ScorePayloadType = { difficulty: DifficultyType; data: ScoreItemState };

export const scoreTableSlice = createSlice({
  name: 'scoreTable',
  initialState,
  reducers: {
    updateFirstResult: (
      state,
      action: {
        payload: ScorePayloadType;
      }
    ) => {
      state[action.payload.difficulty].third = state.easy.second;
      state[action.payload.difficulty].second = state.easy.first;
      state[action.payload.difficulty].first = action.payload.data;
    },
    updateSecondResult: (
      state,
      action: {
        payload: ScorePayloadType;
      }
    ) => {
      state[action.payload.difficulty].third = state.easy.second;
      state[action.payload.difficulty].second = action.payload.data;
    },
    updateThirdResult: (
      state,
      action: {
        payload: ScorePayloadType;
      }
    ) => {
      state[action.payload.difficulty].third = action.payload.data;
    },
    resetScoreTable: (state) => {
      state.easy = initialState.easy;
      state.hard = initialState.hard;
      state.medium = initialState.medium;
    },
  },
});

export const { resetScoreTable, updateFirstResult, updateSecondResult, updateThirdResult } =
  scoreTableSlice.actions;
export default scoreTableSlice.reducer;
