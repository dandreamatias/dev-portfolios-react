import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HTTP } from '../http';

export const get = createAsyncThunk('sites/fetch', async (queryparams, thunkAPI) => {
  const response = await HTTP.get('sites' + queryparams);
  return response;
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
