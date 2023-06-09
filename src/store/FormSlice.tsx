/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface FormSettingsState {
  difficulty: string;
  bombNumber: number;
}

export interface FormState {
  settings: FormSettingsState;
}

const initialState: FormState = {
  settings: {
    difficulty: 'easy',
    bombNumber: 10,
  },
};
export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    update: (
      state,
      action: {
        payload: FormSettingsState;
      }
    ) => {
      state.settings = action.payload;
    },
  },
});

export const { update } = formSlice.actions;
export default formSlice.reducer;
