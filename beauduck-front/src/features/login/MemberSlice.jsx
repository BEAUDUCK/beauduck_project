import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { async } from 'q';
import { useCookies } from 'react-cookie';

const server = 'http://3.38.169.2:8080/';
const global = 'http://i8b306.p.ssafy.io:8080/';

export const UserLogin = createAsyncThunk(
  'member/login',
  async (accessToken) => {
    console.log('로그인');
    const res = await axios.get(
      `${server}naver/login?accessToken=${accessToken}`,
    );
    return res.data;
  },
);

export const signUp = createAsyncThunk('member/signup', async (payload) => {
  console.log('회원가입');
  const res = await axios
    .post(`${server}naver/signup`, payload)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
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
    // 회원가입
    isSignup: false,
    memberInfo: [],
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
      state.isSignup = !state.isSignup;
      state.memberInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.memberId = action.payload.data.memberId;
      state.name = action.payload.data.name;
      state.nickName = action.payload.data.nickName;
    });
  },
});

export const { getMemberId, getNickName, removeMember, goToLogin } =
  memberSlice.actions;
export default memberSlice.reducer;
