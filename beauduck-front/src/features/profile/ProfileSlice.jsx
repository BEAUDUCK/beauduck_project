import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import memberAxios from '../../api/memberAxios';


// 회원 정보 조회 GET
export const getMemberInfo = createAsyncThunk(
  'members/getMemberInfo',
  async (memberId) => {
    const res = await memberAxios.get(`/members/${memberId}/`);
    console.log(res.data)
    return res.data.data;
  },
);

// 회원 정보 수정 put
export const UpdateMemberInfo = createAsyncThunk(
  'members/UpdateMemberInfo',
  async () => {
    const res = await memberAxios.put('/members/update');
    return res.data;
  },
);

// 회원 닉네임 중복 여부 확인
// export const checkNickname  = createAsyncThunk(
//   'members/checkNickname',
//   async (nickName) => {
//     const res = await client.get(`/members/${nickName}`);
//     return res.data;
//   },
// );


// 회원의 최근 진행한 메이크업 목록 get
export const recentMakeupList = createAsyncThunk(
  'members/recentMakeupList',
  async (memberid) => {
    const res = await memberAxios.get(`/members/${memberid}/recent-makeup`);
    return res.data;
  },
);

// 회원의 내가 만든 메이크업 목록 get
export const myMakeupList = createAsyncThunk(
  'members/myMakeupList',
  async () => {
    const res = await memberAxios.get('/members/${memberid}/my-makeup');
    return res.data;
  },
);

// 회원의 갤러리 get
export const gallery = createAsyncThunk(
  'member/gallery',
  async () => {
    const res = await memberAxios.get('/members/{memberId}/gallery');
    return res.data;
  },
);

// 회원의 갤러리 공개여부 수정 put
export const galleryopen = createAsyncThunk(
  'member/galleryopen',
  async () => {
    const res = await memberAxios.put('/members/gallery');
    return res.data;
  },
);
// 회원 얼굴 정보 저장은 미정

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: undefined
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getMemberInfo.fulfilled,(state, action) => {
      state.userInfo = action.payload
    })

  },
})

export const { logout } = profileSlice.actions;
export const { checkMemberId } = profileSlice.actions;

export default profileSlice.reducer;