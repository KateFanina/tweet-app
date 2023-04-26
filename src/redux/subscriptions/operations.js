import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6443d475466f7c2b4b5b31fe.mockapi.io/api/v1/';

export const fetchFollowings = createAsyncThunk(
  'subscriptions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/subscriptions');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateFollowings = createAsyncThunk(
  'subscriptions/updateFollowings',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`/subscriptions/${data.id}`, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
