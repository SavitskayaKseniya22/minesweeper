/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { clearOfDuplicates } from '../utils/utils';

export interface PressedCellsState {
  left: {
    counter: number;
    clicks: number[];
    totalClicks: number[];
  };
  right: {
    counter: number;
    clicks: number[];
    totalClicks: number[];
  };
  startIndex: number | undefined;
  endIndex: number | undefined;
}

const initialState: PressedCellsState = {
  left: {
    counter: 0,
    clicks: [],
    totalClicks: [],
  },
  right: {
    counter: 0,
    clicks: [],
    totalClicks: [],
  },
  startIndex: undefined,
  endIndex: undefined,
};

export const pressedCellsSlice = createSlice({
  name: 'pressedCells',
  initialState,
  reducers: {
    increaseLeftCounter: (state) => {
      state.left.counter += 1;
    },
    increaseRightCounter: (state) => {
      state.right.counter += 1;
    },
    updateLeftClicks: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.left.clicks = clearOfDuplicates([...state.left.clicks, ...action.payload]);
    },
    updateRightClicks: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.right.clicks = clearOfDuplicates([...state.right.clicks, ...action.payload]);
    },
    filterRightClicks: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      state.right.clicks = state.right.clicks.filter((elem) => !action.payload.includes(elem));
    },

    setClicksValues: (
      state,
      action: {
        payload: { blank: number[]; bombed: number[] };
      }
    ) => {
      state.right.totalClicks = action.payload.bombed;
      state.left.totalClicks = action.payload.blank;
    },
    setStartIndex: (
      state,
      action: {
        payload: number;
      }
    ) => {
      state.startIndex = action.payload;
    },
    setEndIndex: (
      state,
      action: {
        payload: number;
      }
    ) => {
      state.endIndex = action.payload;
    },
    resetClicksValues: (state) => {
      state.endIndex = initialState.endIndex;
      state.startIndex = initialState.startIndex;
      state.left = initialState.left;
      state.right = initialState.right;
    },
  },
});

export const {
  increaseLeftCounter,
  increaseRightCounter,
  resetClicksValues,
  setEndIndex,
  setStartIndex,
  setClicksValues,
  filterRightClicks,
  updateRightClicks,
  updateLeftClicks,
} = pressedCellsSlice.actions;
export default pressedCellsSlice.reducer;
