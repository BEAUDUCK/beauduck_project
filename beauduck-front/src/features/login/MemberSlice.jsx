import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const server = 'https://i8b306.p.ssafy.io/';
const global = 'https://i8b306.p.ssafy.io:8080/';

export const UserLogin = createAsyncThunk(
  'member/UserLogin',
  async (accessToken) => {
    const newAccessToken = encodeURIComponent(accessToken);
    console.log('로그인 직전!', newAccessToken);
    const res = await axios.get(
      `${global}naver/login?accessToken=${newAccessToken}`,
    );
    console.log('로그인', res);
    return res.data;
  },
);

export const signUp = createAsyncThunk('member/signUp', async (payload) => {
  await axios.post(`${global}naver/signup`, payload);
  const newAccessToken = encodeURIComponent(payload.accessToken);
  const res = await axios.get(
    `${global}naver/login?accessToken=${newAccessToken}`,
  );
  console.log('회원가입 후 로그인', res);
  return res.data;
});

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
    loginRejected: false,
    // 회원가입
    isSignup: false,
    // memberInfo: [],
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
    goToLogin: (state, action) => {
      state.isSignup = false;
    },
    goToSignup: (state, action) => {
      state.isSignup = true;
      // state.memberInfo = action.payload;
    },
    accessLogin: (state, action) => {
      state.loginRejected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.fulfilled, (state, action) => {
        console.log("이미 회원가입 한 사람입니다.")
        state.loginRejected = false;
        state.memberId = action.payload.data.memberId;
        state.name = action.payload.data.name;
        state.nickName = action.payload.data.nickName;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        console.log('회원가입 되지 않은 사람입니다.');
        console.log(action);
        state.loginRejected = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.memberId = action.payload.data.memberId;
        state.name = action.payload.data.name;
        state.nickName = action.payload.data.nickName;
        state.loginRejected = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log('dsds');
        state.loginRejected = true;
      });
  },
});

export const {
  getMemberId,
  getNickName,
  removeMember,
  goToLogin,
  goToSignup,
  accessLogin,
} = memberSlice.actions;
export default memberSlice.reducer;
