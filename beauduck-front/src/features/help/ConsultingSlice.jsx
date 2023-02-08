import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { async } from 'q';
import client from '../../api/consultAxios';

// 전체 컨설팅 리스트 불러오기
export const getConsultingList = createAsyncThunk(
  'help/getConsulting',
  async () => {
    const res = await client.get('/consult/');
    return res.data;
  },
);

// 새로운 컨설팅 추가
export const postNewConsulting = createAsyncThunk(
  'help/newConsulting',
  async (newConsulting) => {
    const res = await client.post('/consult/', newConsulting);
    return res.data;
  },
);

// 방 상세조회 (대기열)
export const getConsultDetail = createAsyncThunk(
  'help/getConsultDetail',
  async (roomId) => {
    const res = await client.patch(`/consult/${roomId}`);
    return res.data;
  },
);

// 유저 방 입장 -> 방 상세 갱신
export const enterUser = createAsyncThunk('help/enterUser', async (payload) => {
  await client.post('/consult/enter/');
  const res = await client.patch(`/consult/${payload.roomId}`);
  return res.data;
});

// 유저 방 퇴장 -> 방 상세 갱신
export const outUser = createAsyncThunk('help/outUser', async (payload) => {
  await client.post('/consult/out/');
  const res = await client.patch(`/consult/${payload.roomId}`);
  return res.data;
});

export const consultSlice = createSlice({
  name: 'consulting',
  initialState: {
    consultingList: [],
    consultDetail: [],
    userList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConsultingList.fulfilled, (state, action) => {
        state.consultingList = action.payload;
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
