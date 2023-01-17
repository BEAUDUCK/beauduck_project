import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosGetMembers = createAsyncThunk(
  'member/axiosGetMembers',
  async () => {
    return axios({
      method: 'get',
      url: 'http://13.209.252.39:8080/member',
    }).then((res) => res.data);
  },
);

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    members: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosGetMembers.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.members = action.payload;
    });
  },
});

export default memberSlice.reducer;
