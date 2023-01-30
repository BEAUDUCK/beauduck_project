import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 전체 메이크업 리스트 조회
export const getMakeupList = createAsyncThunk(
  'single/getMakeupList',
  async () => {
    const res = await axios.get('/makeup');
    return res.data;
  },
);

// 개별 메이크업 상세 조회
export const getMakeupDetail = createAsyncThunk(
  'single/getMakeupDetail',
  async (id) => {
    const res = await axios.get(`/makeup/${id}`);
    return res.data;
  },
);

export const singleSlice = createSlice({
  name: 'single',
  initialState: {
    makeupList: [],
    makeupDetail: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMakeupList.fulfilled, (state, action) => {
      state.makeupList = action.payload;
    });
    builder.addCase(getMakeupDetail.fulfilled, (state, action) => {
      state.makeupDetail = action.payload;
    });
  },
});

export default singleSlice.reducer;
