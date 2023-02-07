import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const server = 'http://3.38.169.2:8080/';
const global = 'http://i8b306.p.ssafy.io:8080/';
export const UserLogin = createAsyncThunk(
  'member/login',
  async (accessToken) => {
    console.log('로그인할게!', accessToken);
    const res = await axios.get(
      `${server}naver/login?accessToken=${accessToken}`,
    );
    return res.data;
  },
);

export const checkToken = createAsyncThunk('member/checkToken', async () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await axios.get(`${server}refresh?refreshToken=${refreshToken}`);
  setCookie(res.data.data.accessToken);
  return res.data;
});

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: '',
    name: '',
    nickName: '',
  },
  reducers: {
    getMemberId: (state, action) => {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
    },
    getNickName: (state, action) => {
      state.nickName = action.payload;
    },
    removeMember: (state, action) => {
      state.memberId = '';
      state.name = '';
      state.nickName = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.memberId = action.payload.data.memberId;
      state.name = action.payload.data.name;
    });
  },
});

export const { getMemberId, getNickName, removeMember } = memberSlice.actions;
export default memberSlice.reducer;
