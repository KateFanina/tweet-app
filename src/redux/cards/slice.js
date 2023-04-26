import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchCards,
  updateCard,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCards.pending, handlePending)
      .addCase(fetchCards.rejected, handleRejected)
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items
          .findIndex(card => card.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
      })
      .addCase(updateCard.pending, handlePending)
      .addCase(updateCard.rejected, handleRejected)
});

export const cardsReducer = cardsSlice.reducer;
