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
    const res = await client.get(`/consult/${roomId}`);
    return res.data.data;
  },
);

// 유저 방 입장 -> 방 상세 갱신
export const enterUser = createAsyncThunk('help/enterUser', async (payload) => {
  const check = await client.post('/consult/enter/', payload);
  console.log(check.data);
  const res = await client.get(`/consult/${payload.roomId}`);
  return res.data;
});

// 유저 방 퇴장 -> 방 상세 갱신
export const outUser = createAsyncThunk('help/outUser', async (payload) => {
  const check = await client.post('/consult/out/', payload);
  const res = await client.get(`/consult/${payload.roomId}`);
  return res.data;
});

export const consultSlice = createSlice({
  name: 'consulting',
  initialState: {
    consultingList: [],
    consultDetail: [],
    roomId: '',
    userList: [],
    isActive: false,

    // 검사
    userCount: 0,
    resultList: [],
    secondResult: [],
    nowIdx: 0,
    nowCount: 0,
  },
  reducers: {
    checkIsHost: (state, action) => {
      state.isHost = true;
      state.userCount = state.userList.length;
    },
    // 과반체크
    setScoreFirst: (state, action) => {
      const idx = action.payload;
      const stageIdx = idx % 10
      console.log("idx :", idx)
      if (idx === state.nowIdx) {
        state.nowCount += 1;
        console.log("state의 nowCount :", state.nowCount)
        if (state.nowCount >= state.userCount) {
          console.log("state.resultList[idx % 10] :", state.resultList[stageIdx])
          state.resultList[stageIdx] += 1;
        }
      } else {
        state.nowCount = 1;
        state.nowIdx = idx;
      }
      console.log('첫번째 결과 리스트', state.resultList);
    },
    // 카운트 전부 체크
    setScoreSecond: (state, action) => {
      state.secondResult.concat(action.payload)
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
        state.isActive = true
      })
      .addCase(getConsultDetail.fulfilled, (state, action) => {
        state.consultDetail = action.payload;
        state.userList = action.payload.userList;
      })
      .addCase(enterUser.fulfilled, (state, action) => {
        state.userList = action.payload.userList;
      })
      .addCase(outUser.fulfilled, (state, action) => {
        state.userList = action.payload.userList;
      });
  },
});

export default consultSlice.reducer;
export const { checkIsHost, setScoreFirst, setScoreSecond } = consultSlice.actions;