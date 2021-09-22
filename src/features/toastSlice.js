import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: { visible: false, text: '' },
  reducers: {
    show: (state, action) => {
      state.visible = true;
      state.text = action.payload;
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hide, show } = toastSlice.actions;

export default toastSlice.reducer;
