/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getFieldParameters } from '../utils/utils';
import { DifficultyType } from '../utils/interfaces';

export interface FormValuesState {
  difficulty: DifficultyType;
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
    difficulty: DifficultyType.EASY,
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
        payload: DifficultyType;
      }
    ) => {
      state.fieldParameters = getFieldParameters(action.payload);
    },
  },
});

export const { updateFormValues, updateFieldParameters } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
