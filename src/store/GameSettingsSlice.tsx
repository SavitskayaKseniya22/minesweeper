/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getFieldParameters } from '../utils/utils';

export interface FormValuesState {
  difficulty: string;
  bombNumber: number;
}

export interface FieldParametersState {
  cellsNumber: number;
  width: number;
  bombNumberDefault: number;
  range: {
    min: number;
    max: number;
  };
}

export interface GameSettingsState {
  formValues: FormValuesState;
  fieldParameters: FieldParametersState;
}

const initialState: GameSettingsState = {
  formValues: {
    difficulty: 'easy',
    bombNumber: 10,
  },
  fieldParameters: {
    cellsNumber: 100,
    width: 10,
    bombNumberDefault: 10,
    range: {
      min: 10,
      max: 99,
    },
  },
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    updateFormValues: (
      state,
      action: {
        payload: FormValuesState;
      }
    ) => {
      state.formValues = action.payload;
    },
    updateFieldParameters: (
      state,
      action: {
        payload: string;
      }
    ) => {
      state.fieldParameters = getFieldParameters(action.payload);
    },
  },
});

export const { updateFormValues, updateFieldParameters } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
