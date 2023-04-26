import { createSlice } from '@reduxjs/toolkit';

import { 
  fetchFollowings,
  updateFollowings,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchFollowings.pending, handlePending)
      .addCase(fetchFollowings.rejected, handleRejected)
      .addCase(fetchFollowings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(updateFollowings.pending, handlePending)
      .addCase(updateFollowings.rejected, handleRejected)
      .addCase(updateFollowings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [action.payload];
      })
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
