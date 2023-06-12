/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface StopwatchState {
  value: number;
}

const initialState: StopwatchState = {
  value: 0,
};

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    increaseStopwatchValue: (state) => {
      state.value += 1;
    },
    updateStopwatchValue: (
      state,
      action: {
        payload: number;
      }
    ) => {
      state.value = action.payload;
    },

    resetStopwatch: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { increaseStopwatchValue, resetStopwatch, updateStopwatchValue } =
  stopwatchSlice.actions;
export default stopwatchSlice.reducer;
