import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchFollowings, updateFollowings } from '../subscriptions/operations';

export const fetchCards = createAsyncThunk(
  'cards/fetchAll',
  async ({ page, limit, search }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/tweets?${search}&page=${page}&limit=${limit}`
      );
      thunkAPI.dispatch(fetchFollowings());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`/tweets/${data.card.id}`, data.card);
      thunkAPI.dispatch(updateFollowings(data.followingsData));
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
