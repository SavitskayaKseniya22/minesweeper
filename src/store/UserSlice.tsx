/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
}

const initialState: UserState = {
  name: 'Anonymous',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateName: (
      state,
      action: {
        payload: string;
      }
    ) => {
      state.name = action.payload;
    },

    resetName: (state) => {
      state.name = initialState.name;
    },
  },
});

export const { updateName, resetName } = userSlice.actions;
export default userSlice.reducer;
