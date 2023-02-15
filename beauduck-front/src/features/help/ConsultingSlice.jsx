import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { async } from 'q';
import client from '../../api/consultAxios';

// 전체 컨설팅 리스트 불러오기
export const getConsultingList = createAsyncThunk(
  'help/getConsulting',
  async () => {
    const res = await client.get('/consult/');
    return res.data.data;
  },
);

// 새로운 컨설팅 추가
export const postNewConsulting = createAsyncThunk(
  'help/newConsulting',
  async (newConsulting) => {
    const res1 = await client.post('/consult/', newConsulting);
    const res2 = await client.get('/consult/');
    return [res1.data.data, res2.data.data];
  },
);

// 방 상세조회 (대기열)
export const getConsultDetail = createAsyncThunk(
  'help/getConsultDetail',
  async (roomId) => {
    const res = await client.get(`/consult/${roomId}/`);
    return res.data.data;
  },
);

// 유저 방 입장 -> 방 상세 갱신
export const enterUser = createAsyncThunk('help/enterUser', async (payload) => {
  const check = await client.post('/consult/enter/', payload);
  console.log('check', check.data);
  const res = await client.get(`/consult/${payload.roomId}`);
  return res.data;
});

// 유저 방 퇴장 -> 방 상세 갱신
export const outUser = createAsyncThunk('help/outUser', async (payload) => {
  const check = await client.post('/consult/out/', payload);
  const res = await client.get(`/consult/${payload.roomId}`);
  return res.data;
});

// 뉴스 크롤링
export const getMakeupInfo = createAsyncThunk('help/getNews', async () => {
  const res1 = await client.get('/naver/news');
  const res2 = await client.get('/naver/blog');
  const res3 = await client.get('/naver/shop/?keyword=makeup');
  return [res1.data, res2.data, res3.data];
});

export const consultSlice = createSlice({
  name: 'consulting',
  initialState: {
    consultingList: [],
    consultDetail: [],
    roomId: '',
    userList: [],
    isActive: false,
    isHost: false,
    // 검사
    userCount: 0,
    resultList: [],
    secondResult: [],
    nowIdx: 0,
    nowCount: 0,
    // 집중s
    isExercising: 'start',
    isFinished: undefined,
    myResult: [],
    allResult: [],
    // 뉴스 크롤링
    infoNews: [],
    infoBlog: [],
    infoShop: [],
  },
  reducers: {
    checkIsHost: (state, action) => {
      state.isHost = true;
      state.userCount = state.userList.length;
    },
    loadingOut: (state, action) => {
      state.isActive = false;
    },
    // 집중 참고
    setExerciseStatus: (state, action) => {
      state.isExercising = action.payload;
    },
    setFinishStatus: (state, action) => {
      state.isFinished = action.payload;
    },
    setMyExerciseResult: (state, action) => {
      const beforeResult = [...state.myResult];
      const newResult = [...action.payload];
      state.myResult = beforeResult.concat(newResult);
      console.log('저장해쒀', state.myResult);
    },
    setAllExerciseResult: (state, action) => {
      const results = action.payload;
      console.log('저장하러 왔어 results', results);
      const newResult = [];
      for (let i = 0; i < results.length; i++) {
        newResult.concat(results[i].personalResults);
        console.log(i, '넣는 중 ', newResult);
      }
      console.log('newResult', newResult);
      state.allResult = newResult;
      console.log('잘들어왔슴니다', state.allResult);

      //콘솔 찍어보고 반복문 고민
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConsultingList.fulfilled, (state, action) => {
        state.consultingList = action.payload;
      })
      .addCase(postNewConsulting.fulfilled, (state, action) => {
        state.roomId = action.payload[0].roomId;
        state.consultingList = action.payload[1];
        state.isActive = true;
        state.isHost = true;
        state.myResult = [];
        state.allResult = [];
        state.isExercising = 'start';
      })
      .addCase(getConsultDetail.fulfilled, (state, action) => {
        state.consultDetail = action.payload;
        state.userList = action.payload.userList;
      })
      .addCase(enterUser.fulfilled, (state, action) => {
        state.consultDetail = action.payload.data;
        state.userList = action.payload.data.userList;
        state.isHost = false;
        state.myResult = [];
        state.allResult = [];
        state.isExercising = 'start';
      })
      .addCase(outUser.fulfilled, (state, action) => {
        state.consultDetail = action.payload.data;
        state.userList = action.payload.data.userList;
      })
      .addCase(getMakeupInfo.fulfilled, (state, action) => {
        state.infoNews = action.payload[0].items;
        state.infoBlog = action.payload[1].items;
        state.infoShop = action.payload[2].items;
      });
  },
});

export default consultSlice.reducer;
export const {
  checkIsHost,
  loadingOut,
  setExerciseStatus,
  setFinishStatus,
  setMyExerciseResult,
  setAllExerciseResult,
} = consultSlice.actions;
