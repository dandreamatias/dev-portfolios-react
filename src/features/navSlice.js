import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'navbar',
  initialState: { visible: false, button: { show: true, text: 'EXPLORE', path: '/daily-mix' } },
  reducers: {
    show: (state) => {
      state.visible = true;
    },
    hide: (state) => {
      state.visible = false;
    },
    updateBtn: (state, action) => {
      state.button = action.payload;
    },
  },
});

export const { hide, show, updateBtn } = navSlice.actions;
export default navSlice.reducer;
