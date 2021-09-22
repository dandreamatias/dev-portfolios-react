import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { env } from '../environments/env';

export const get = createAsyncThunk('sites/fetch', async (queryparams, thunkAPI) => {
  const response = await fetch(env.url + 'sites' + queryparams);
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'sites',
  initialState: { cards: [{ hasMore: true, isLazy: true }], start: 0, loading: false },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(get.fulfilled, (state, action) => {
      state.cards = [
        ...state.cards.filter((c) => !c.isLazy),
        ...action.payload,
        { hasMore: !!action.payload.length, isLazy: true },
      ];

      state.loading = false;
    });
    builder.addCase(get.pending, (state, action) => {
      state.start += 10;
      state.loading = true;
    });
  },
});

export default usersSlice.reducer;
