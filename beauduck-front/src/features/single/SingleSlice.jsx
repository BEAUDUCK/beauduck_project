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

// 새로운 메이크업 만들기
export const createNewMakeup = createAsyncThunk(
  'single/createNewMakeup',
  async (newProcess) => {
    const res = await axios.post('makeup', newProcess);
    return res.data;
  },
);

// 메이크업 추천 요청 + 받기
export const recommendMakeup = createAsyncThunk(
  'single/recommendMakeup',
  async (id) => {
    const res = await axios.post('makeup/recommend', id);
    const res2 = await axios.get('makeup/recommend');
    return res2.data;
  },
);

export const singleSlice = createSlice({
  name: 'single',
  initialState: {
    makeupList: [],
    makeupDetail: '',
    completed: false, // 만들기
    recommendList: [],
  },
  reducers: {
    submitMakeup: (state, action) => {
      state.completed = true;
    },
    rejectedMakeup: (state, action) => {
      state.completed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMakeupList.fulfilled, (state, action) => {
        state.makeupList = action.payload;
      })
      .addCase(getMakeupDetail.fulfilled, (state, action) => {
        state.makeupDetail = action.payload;
      })
      .addCase(createNewMakeup.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(recommendMakeup.fulfilled, (state, action) => {
        state.recommendList = action.payload;
      });
  },
});
export const { submitMakeup, rejectedMakeup } = singleSlice.actions;

export default singleSlice.reducer;
