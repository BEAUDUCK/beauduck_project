import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../api/singleAxios';

// 전체 메이크업 리스트 조회
export const getMakeupList = createAsyncThunk(
  'single/getMakeupList',
  async () => {
    console.log('하이');
    const res = await client.get('/makeup/');
    return res.data;
  },
);

// 개별 메이크업 상세 조회
export const getMakeupDetail = createAsyncThunk(
  'single/getMakeupDetail',
  async (makeupId) => {
    const res = await client.get(`/makeup/${makeupId}/`);
    return res.data;
  },
);

// 새로운 메이크업 만들기
export const createNewMakeup = createAsyncThunk(
  'single/createNewMakeup',
  async (newProcess) => {
    const res = await client.post('/makeup/', newProcess);
    return res.data;
  },
);

// 이미지 따로 저장
export const saveMakeupImg = createAsyncThunk(
  'single/saveMakeupImg',
  async (payload) => {
    console.log('찐으로 보내는거', payload.img);
    const imgFile = payload.img;
    const res = await client
      .post(`/makeup/img/${payload.id}/`, payload.img, {
        headers: imgFile.getHeaders(),
        // {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
);

// 메이크업 추천 요청 + 받기
export const recommendMakeup = createAsyncThunk(
  'single/recommendMakeup',
  async (payload) => {
    const res = await client.post('/makeup/recommend/', payload);
    // const res = await client.get('makeup/recommend');
    return res.data;
  },
);

// 메이크업 진행
export const startMakeup = createAsyncThunk(
  'single/startMakeup',
  async (selectedStep) => {
    console.log('들어왔나?');
    const res = await client.post('/makeup/execute/', selectedStep);
    console.log('ds', res.data.makeupMainList);
    return res.data.makeupMainList;
  },
);

// 메이크업 최종결과 이미지 저장
export const saveImage = createAsyncThunk(
  'single/saveImage',
  async (payload) => {
    await client.post('/makeup/gallery/', payload);
  },
);

// 메이크업 평가 및 나가기

// 최근 메이크업 저장

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
    btnState: false, // false가 생성 상태 (true가 수정/삭제)
    // 진행
    mainList: [],
    nowMakeup: undefined,
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
    // changeBtnState: (state, action) => {
    //   state.btnState = !state.btnState;
    // },
    setBtnStateCreate: (state, action) => {
      state.btnState = false;
    },
    setBtnStateUpdate: (state, action) => {
      state.btnState = true;
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
export const {
  submitMakeup,
  rejectedMakeup,
  selectMain,
  // changeBtnState,
  setBtnStateCreate,
  setBtnStateUpdate,
} = singleSlice.actions;

export default singleSlice.reducer;
