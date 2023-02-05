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
    await axios.post('makeup/recommend', id);
    const res = await axios.get('makeup/recommend');
    return res.data;
  },
);

// 메이크업 진행
export const startMakeup = createAsyncThunk(
  'single/startMakeup',
  async (selectedStep) => {
    const res = await axios.post('makeup/execute', selectedStep);
    return res.data;
  },
);

export const singleSlice = createSlice({
  name: 'single',
  initialState: {
    makeupList: [],
    makeupDetail: '',
    recommendList: [],
    // 만들기
    completed: false,
    title: '',
    content: '',
    duration: '',
    // 진행
    mainList: [],
  },
  reducers: {
    submitMakeup: (state, action) => {
      state.completed = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.duration = action.payload.duration;
    },
    rejectedMakeup: (state, action) => {
      state.completed = false;
    },
    selectMain: (state, action) => {
      state.mainList = action.payload;
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
      })
      .addCase(startMakeup.fulfilled, (state, action) => {
        state.nowMakeup = action.payload;
      });
  },
});
export const { submitMakeup, rejectedMakeup, selectMain } = singleSlice.actions;

export default singleSlice.reducer;
