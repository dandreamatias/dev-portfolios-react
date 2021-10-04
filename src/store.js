import { configureStore } from '@reduxjs/toolkit';
import sitesReducer from './features/sitesSlice';
import toastReducer from './features/toastSlice';
import navReducer from './features/navSlice';

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
    toast: toastReducer,
    nav: navReducer,
  },
});
