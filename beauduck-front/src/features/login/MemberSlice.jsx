import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const server = 'http://3.38.169.2:8080/';
const global = 'http://i8b306.p.ssafy.io:8080/';

export const UserLogin = createAsyncThunk(
  'member/UserLogin',
  async (accessToken) => {
    console.log('로그인');
    const res = await axios
      .get(`${server}naver/login?accessToken=${accessToken}`)
      .then((res) => {
        console.log('로그인 res', res.data.data);
      })
      .catch((err) => console.log('로그인 err', err));
    return res.data.data;
  },
);

export const signUp = createAsyncThunk('member/signUp', async (payload) => {
  console.log('회원가입');
  await axios
    .post(`${server}naver/signup`, payload)
    .then((res) => {
      console.log('회원가입 res', res);
    })
    .catch((err) => console.log('회원가입 err', err));
  const res = await axios
    .get(`${server}naver/login?accessToken=${payload.accessToken}`)
    .then((res) => console.log(res));
  return res.data.data;
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
        console.log('dsds', action.payload.data);
        state.loginRejected = false;
        state.memberId = action.payload.data.memberId;
        state.name = action.payload.data.name;
        state.nickName = action.payload.data.nickName;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        console.log('dldl');
        state.loginRejected = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.memberId = action.payload.data.memberId;
        state.name = action.payload.data.name;
        state.nickName = action.payload.data.nickName;
        state.loginRejected = false;
      })
      .addCase(signUp.rejected, (state, action) => {
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
