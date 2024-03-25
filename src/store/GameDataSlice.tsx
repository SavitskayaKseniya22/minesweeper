/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { GameDataState } from '../utils/interfaces';
import { clearOfDuplicates } from '../utils/utils';

const initialState: GameDataState = {
  clicks: {
    left: {
      counter: 0,
      list: [],
    },
    right: {
      counter: 0,
      list: [],
    },
    startIndex: undefined,
    endIndex: undefined,
  },
  initData: [],
};

export const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    updateInitData: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.initData = action.payload;
    },
    increaseLeftCounter: (state) => {
      state.clicks.left.counter += 1;
    },
    increaseRightCounter: (state) => {
      state.clicks.right.counter += 1;
    },
    updateLeftClicks: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.clicks.left.list = clearOfDuplicates([...state.clicks.left.list, ...action.payload]);
    },
    updateRightClicks: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.clicks.right.list = clearOfDuplicates([...state.clicks.right.list, ...action.payload]);
    },
    filterRightClicks: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.clicks.right.list = state.clicks.right.list.filter(
        (elem) => !action.payload.includes(elem)
      );
    },

    setStartIndex: (
      state,
      action: {
        payload: number;
      }
    ) => {
      state.clicks.startIndex = action.payload;
    },
    setEndIndex: (
      state,
      action: {
        payload: number;
      }
    ) => {
      state.clicks.endIndex = action.payload;
    },

    resetGameData: (state) => {
      state.clicks.endIndex = initialState.clicks.endIndex;
      state.clicks.startIndex = initialState.clicks.startIndex;
      state.clicks.left = initialState.clicks.left;
      state.clicks.right = initialState.clicks.right;
      state.initData = initialState.initData;
    },
  },
});

export const {
  increaseLeftCounter,
  increaseRightCounter,
  resetGameData,
  setEndIndex,
  setStartIndex,
  filterRightClicks,
  updateRightClicks,
  updateLeftClicks,
  updateInitData,
} = gameDataSlice.actions;
export default gameDataSlice.reducer;
