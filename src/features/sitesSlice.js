import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { devPortfoliosApi } from '../http';

export const get = createAsyncThunk('sites/fetch', async (start, thunkAPI) => {
  const [response, errors] = await devPortfoliosApi.get('sites', { start });
  if (errors) return [];
  return response;
});

const sitesSlice = createSlice({
  name: 'sites',
  initialState: { cards: [{ hasMore: true, isLazy: true }], start: 0, loading: false },
  reducers: {},
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

export default sitesSlice.reducer;
