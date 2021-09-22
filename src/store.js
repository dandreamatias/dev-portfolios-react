import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/prova';
import toastReducer from './features/toastSlice';
import navReducer from './features/navSlice';

export const store = configureStore({
  reducer: {
    sites: userReducer,
    toast: toastReducer,
    nav: navReducer,
  },
});
