/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface ScoreItemState {
  name: string;
  time: number;
  data: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: string;
    range: number[];
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
    updateFirstResult: (
      state,
      action: {
        payload: { difficulty: string; data: ScoreItemState };
      }
    ) => {
      state[action.payload.difficulty as keyof ScoreTableState].third = state.easy.second;
      state[action.payload.difficulty as keyof ScoreTableState].second = state.easy.first;
      state[action.payload.difficulty as keyof ScoreTableState].first = action.payload.data;
    },
    updateSecondResult: (
      state,
      action: {
        payload: { difficulty: string; data: ScoreItemState };
      }
    ) => {
      state[action.payload.difficulty as keyof ScoreTableState].third = state.easy.second;
      state[action.payload.difficulty as keyof ScoreTableState].second = action.payload.data;
    },
    updateThirdResult: (
      state,
      action: {
        payload: { difficulty: string; data: ScoreItemState };
      }
    ) => {
      state[action.payload.difficulty as keyof ScoreTableState].third = action.payload.data;
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
